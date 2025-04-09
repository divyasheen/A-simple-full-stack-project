import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from "uuid";
import { getUsers, registerUser } from './users.controller.js';
const router = express.Router();

// setup multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const myFileName = uuidv4() + "_" + file.originalname
        req.myFileName = myFileName;
        cb(null, myFileName)
    }
});

const upload = multer({storage})

// register route
router.get('/', getUsers);
router.post('/register', upload.single('profilepic'), registerUser);
export default router;