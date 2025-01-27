import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

//user registration logic
export const register = async (req, res) => {
    // console.log("inside register function")

    try {
        const {name, email, password} = req.body;
        if(!name || !email ||  !password){
            return res.status(400).json({sucess: false, message: "please return all the fields"})
        }
        
        const userExists = await User.findOne({email})   //return single document(user) from collection
        // console.log("userExists", userExists)
        if(userExists){
            return res.status(400).json({sucess: false, message: "Email already in use"})
        }
        
        //create a strong password from given password
        const hasedPassword = await bcrypt.hash(password, 12);
        
        //create a new user or create a document in the collection
        const user = await User.create({
            name,
            email,
            password: hasedPassword
        })

        return res.status(201).json({sucess: true, message: "User registered successfully", user})
        

    } catch (error) {
        console.log("Error in user registration", error)
        return res.status(500).json({sucess: false, message: "Internal server error"})
    }
}

//user login logic
export const login = async (req, res) => {
    // console.log("inside login function")

    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({sucess: false, message: "Please enter all the fields"})
        }

        const user = await User.findOne({email}); //return single document(user) from collection
        if(!user){
            return res.status(400).json({sucess: false, message: "Invalid Credentials"})
        }

        //compare password with the hashed-password that stored in the database
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({sucess: false, message: "Invalid Password"})
        }
        

        //call the function to generate token and send it in the cookie of http response
        generateToken(user, res, `Welcome back ${user.name}`);
        

    } catch (error) {
        console.log("Error in user login", error);
        return res.status(500).json({sucess: false, message: "Internal server error"})
    }
}

//user logout logic, delete the token from the cookie to logout
export const logout = async (req, res) => {
    try {
        console.log("inside logout function")
        return res
            .status(200)
            .cookie("token", "", {maxAge: 0})
            .json({sucess: true, message: "Logout successfully"});
    } catch (error) {
        console.log("Error in logout", error);
        return res.status(500).json({sucess: false, message: "Internal server error"})
    }
}

//get user profile
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");   //select all the fields except password
        
        if(!user){
            return res.status(404).json({sucess: false, message: "User not found"})
        }

        return res.status(200).json({sucess: true, message: "User profile fetched successfully", user})

    } catch (error) {
        console.log("Error in getting user profile", error);
        return res.status(500).json({sucess: false, message: "Internal server error"})
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({sucess: false, message: "User not found"})
        }

        
    } catch (error) {
        console.log("Error in updating user profile", error);
        return res.status(500).json({sucess: false, message: "Internal server error"})
    }
}

