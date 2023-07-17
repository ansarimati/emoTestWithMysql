import mysqlConnection from "../connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

export const registerUser =   (req, res) => {

    const { name, email, gender, password } = req.body;
    console.log( name, email, gender, password );
    if( name && email && gender && password ) {

        try {
            // check if user already exist if not then register
    
            mysqlConnection.query(`SELECT email FROM users WHERE email= "${email}"`, async (err, result) => {
                if (err) {
                    console.log("error", err);
                    return res.status(500).json({ message: "server error." });
                } else {
                    // console.log("result", result);
                    if (result.length > 0) {
                        return res.status(400).json({ message: "user already exists." })
                    } else {

                        // hasing password
                        let salt = await bcrypt.genSalt(10);
                        let hashedPassword = await bcrypt.hash(password, salt);
                        
                        // avatar 
                        const avatar = gravatar.url(email, {
                            s: "200",
                            r: "pg",
                            d: "mm"
                        });
                        console.log("avatar", avatar);

                        mysqlConnection.query(`INSERT INTO users (name, email, gender, password, profile_pic) 
                            VALUES ( "${name}", "${email}", "${gender}", "${hashedPassword}", "${avatar}" )`, (err) => {
                            if (err) {
                                console.log("error", err);
                                return res.status(500).json({ message: "server error." });
                            } else {
                                const userId = mysqlConnection.query(`SELECT * FROM users WHERE name="${name}";`, (err, user) => {
                                    if(err) {
                                        console.log("error", err);
                                        return res.status(500).json({ message: "server error." });
                                    } else {
                                        const payload = {
                                            user : {
                                                id: user[0].id 
                                            }
                                        }

                                        jwt.sign(payload, process.env.JwtSecret, { expiresIn: "1h" }, (err, token)=>{
                                            if(err) {
                                                return res.status(500).json({ message: "server error." });
                                            } else {
                                                // console.log(payload);
                                                // console.log(user);
                                                return res.status(200).json({ token, user });
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })
    
        } catch (err) {
            console.log("error", err);
            return res.status(500).json({ message: "server error." })
        }
    } else {
        res.status(400).json({ message: "please enter all the mandetory details" });
    }
};


export const login = (req, res) => {
    const { email, password } = req.body;

    if( email && password ) {
        mysqlConnection.query(`SELECT * FROM users WHERE email="${email}";`, async (err, user)=>{
            if(err) {
                console.log("error", err);
                return res.status(500).json({ message: "server error." });
            } else {
                if(user.length === 0){
                    return res.status(404).json({ message: "username and passowrd invalid." })
                } 
                const isPasswordMatched = await bcrypt.compare(password, user[0].password);
                console.log("ispasswordMatch", isPasswordMatched);
                if(!isPasswordMatched) {
                    return res.status(401).json({ message: "Invalid credentials" });
                } else {
                    console.log("user", user);
                    const payload = {
                        user: {
                            id: user[0].id
                        }
                    }

                    jwt.sign(payload, process.env.JwtSecret, { expiresIn: "1h" }, (err, token)=>{
                        if(err) {
                            return res.status(500).json({ message: "server error." }); 
                        } else {
                            return res.status(200).json({ token, user });
                        }
                    })
                }
            }
        })

    } else {
        return res.status(400).json({ message: "Invalid credentials." })
    }
}