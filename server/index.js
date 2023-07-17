import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";

import { getAllUsers } from "./controllers/users.js";
import { registerUser } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

// create and configure app 
const app = express();
app.use(cors());
dotenv.config();

// steup port 
const port = process.env.PORT || 5000;

// parse request of content type application/x-www-form-urlenoded
app.use(bodyParser.urlencoded({ extended:true }));

// prase request of content type : application/json
app.use(bodyParser.json());

// routes 
app.get("/users/allusers", getAllUsers);
app.post("/auth/register", registerUser);

app.use("/auth", authRoutes);
app.use("/user", userRoutes);


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

