import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if(!token) {
        return res.status(401).json({ message: "No Token, authorization denied." })
    } 

    try {
        const decodedToken = jwt.verify(token, process.env.JwtSecret);
        console.log("decodedToken", decodedToken);
        req.user = decodedToken.user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" })
    }
}

export default auth;
