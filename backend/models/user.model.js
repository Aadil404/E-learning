import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "instructor", "admin"],  //valid roles
        default: "student"
    },
    enrolledCourses: [     //a student can be enrolled in multiple courses
        {
            type: mongoose.Schema.Types.ObjectId, //store the id of the course collection
            ref: "Course" // Reference to the Course model
        }
    ],
    photoURL: {
        type: String,
        default: "https://cdn-icons-png.freepik.com/512/8742/8742495.png"
    }

}, {timestamps: true});    //store the timestamps of the creation and updation of the document 

const User = mongoose.model("User", userSchema);

export default User;