import express from 'express';
import { getUserProfile, login, logout, register, updateUserProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {upload} from '../utils/multer.js';

const router = express.Router();

//call register function when user hit /register route
router.route("/register").post(register)     

//call login function when user hit /login route
router.route("/login").post(login)          

//call logout function when user hit /logout route
router.route("/logout").get(logout)         

//check authity, call getUserProfile function when user hit /profile route
router.route("/profile").get(isAuthenticated, getUserProfile)  

//check authity, upload profile photo to uploads folder, call updateUserProfile function when user hit /profile/update route
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto") ,updateUserProfile)



export default router;