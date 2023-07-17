import mysqlConnection from "../connection.js";
import bcrypt from "bcrypt";

export const getAllUsers = (req, res) => {
    mysqlConnection.query("SELECT * FROM users", (err, rows) => {
        if (err) {
            res.status(500).json({ message: "internal server error." })
        } else {
            res.status(200).json({ rows });
        }
    });
}

export const editProfile = (req, res) => {
    const { name, email, phone } = req.body;

    const { filename: profile_pic } = req.file;

    mysqlConnection.query(`SELECT * FROM users WHERE email="${email}"`, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "server error." });
        } else {
            const tempPhone = phone.length === 0 ? null : Number(phone);
            const q = `UPDATE users SET name="${name}", email="${email}", phone=${tempPhone}, profile_pic="${profile_pic}" WHERE id="${req.user.id}"`;
            console.log(q);
            mysqlConnection.query(q, (err, response) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "server error." });
                } else {
                    console.log("res", response);
                    return res.status(201).json({ message: "profile updated" });
                }
            });
        }
    })
}


export const deleteProfile = (req, res) => {
    const { email } = req.body;
    mysqlConnection.query(`DELETE FROM users WHERE email="${email}"`, (err, response) => {
        if (err) {
            return res.status(500).json({ message: "server error." });
        } else {
            return res.status(200).json({ message: "profile deleted" });
        }
    })
}

