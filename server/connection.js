import mysql from "mysql2";

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",   
    password: "asdfghjkl@80",
    database: "usersdb"
})

const connection = mysqlConnection.connect((err)=> {
    if(err) {
        console.log("Error", err);
    } else {
        console.log("DB connected successfully");
    }
});


export default mysqlConnection;