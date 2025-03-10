import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCourse, createLecture, editCourse, getCourseById, getCourseLectures, getCreatorCourse } from '../controllers/course.controller.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

router.route("/create").post(isAuthenticated, createCourse);
router.route("").get(isAuthenticated, getCreatorCourse)
router.route("/edit/:courseId").put(isAuthenticated, upload.single("courseThumbnail") , editCourse)
router.route("/:courseId").get(isAuthenticated, getCourseById)
router.route("/:courseId/lecture").post(isAuthenticated, createLecture)
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLectures)

export default router