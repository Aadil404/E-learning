import express from 'express';
import { login, register } from '../controllers/user.controller.js';

const router = express.Router();


router.route("/register").post(register)     //call register function when user hit /register route
// console.log("inside user.route.js")
router.route("/login").post(login)          //call login function when user hit /login route

export default router;