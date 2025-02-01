import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
    },
    thumbnail: {
        type: String,
    },
    price: {
        type: Number,
    },
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture"
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    isPublished: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const Course =  mongoose.model("Course", courseSchema);

export default Course;