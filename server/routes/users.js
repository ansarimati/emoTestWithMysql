import express from "express";
import { deleteProfile, editProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();

// File Storage 
const storage  = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "images");
    }, 
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post("/editprofile", auth, upload.single("profile_pic") ,  editProfile);
router.delete("/deleteprofile", auth, deleteProfile);

export default  router;