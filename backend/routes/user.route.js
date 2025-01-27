import express from 'express';
import { getUserProfile, login, logout, register } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();


router.route("/register").post(register)     //call register function when user hit /register route
router.route("/login").post(login)          //call login function when user hit /login route
router.route("/logout").get(logout)         //call logout function when user hit /logout route
router.route("/profile").get(isAuthenticated, getUserProfile)  //check authity, call getUserProfile function when user hit /profile route



export default router;