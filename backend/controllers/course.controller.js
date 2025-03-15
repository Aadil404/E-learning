import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
import {
  deleteImageFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMediaToCloudinary,
} from "../utils/cloudinary.js";
import { deleteLocalMedia } from "../utils/multer.js";

//create course
export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res
        .status(400)
        .json({ sucess: false, message: "Title and category is required" });
    }

    const course = await Course.create({ title, category, createdBy: req.id });
    return res
      .status(201)
      .json({ sucess: true, message: "Course created successfully", course });
  } catch (error) {
    console.log("Error in creating course", error);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};

//get all admin courses
export const getCreatorCourse = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ createdBy: userId });
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ sucess: false, message: "Courses not found", courses: [] });
    }
    return res.status(200).json({
      sucess: true,
      message: "All admin courses fetched successfully",
      courses,
    });
  } catch (error) {
    console.log("Error in getting all admin courses", error);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};

export const editCourse = async (req, res) => {
  try {
    //get course id from url
    const courseId = req.params.courseId;

    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const courseThumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ sucess: false, message: "Course not found" });
    }

    //delete old thumbnail from cloudinary
    if (courseThumbnail && course.thumbnail) {
      const publicId = course.thumbnail.split("/").pop().split(".")[0];
      await deleteImageFromCloudinary(publicId);
    }

    //upload new thumbnail to cloudinary
    let thumbnail = course.thumbnail;
    if (courseThumbnail && courseThumbnail.path) {
      const result = await uploadMediaToCloudinary(courseThumbnail.path);
      thumbnail = result.secure_url;
    }

    const updatedData = {
      title: courseTitle,
      subTitle,
      description,
      category,
      level: courseLevel,
      thumbnail,
      price: coursePrice,
    };

    course = await Course.findByIdAndUpdate(courseId, updatedData, {
      new: true,
    });

    //delete local media (uplaods folder) after we upload photo to cloudinary
    if (courseThumbnail && courseThumbnail.path) {
      deleteLocalMedia(courseThumbnail.path);
    }

    return res
      .status(200)
      .json({ sucess: true, message: "Course edited successfully", course });
  } catch (error) {
    console.log("Error in editing course", error);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res
        .status(404)
        .json({ sucess: false, message: "Course not found" });
    }

    return res
      .status(200)
      .json({ sucess: true, message: "Course fetched successfully", course });
  } catch (error) {
    console.log("Error in getting course by id", error);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};

//create lecture for a course
export const createLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lectureTitle } = req.body;

    if (!lectureTitle) {
      return res
        .status(400)
        .json({ sucess: false, message: "Lecture title is required" });
    }

    let course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ sucess: false, message: "Course not found" });
    }

    const createLecture = await Lecture.create({ lectureTitle });

    course.lectures.push(createLecture._id);
    await course.save();

    return res
      .status(201)
      .json({
        sucess: true,
        message: "Lecture created successfully",
        createLecture,
      });
  } catch (error) {
    console.log("Error in creating lecture", error);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};

//get all lectures beloong to a course
export const getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res
        .status(404)
        .json({ sucess: false, message: "course not found" });
    }

    return res
      .status(200)
      .json({
        sucess: true,
        message: "All lectures fetched successfully",
        lectures: course.lectures,
      });
  } catch (error) {
    console.log("Error in getting all lectures", error);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { lectureId, courseId } = req.params;
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res
        .status(404)
        .json({ sucess: false, message: "Lecture not found" });
    }

    //update lecture
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }

    if (videoInfo.videoUrl) {
      //delete old video from cloudinary
      if (lecture.publicId) {
        const publicId = lecture.publicId;
        await deleteVideoFromCloudinary(publicId);
      }
      lecture.videoUrl = videoInfo.videoUrl;
    }

    if (videoInfo.publicId) {
      lecture.publicId = videoInfo.publicId;
    }

    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lectureId)) {
      course.lectures.push(lectureId);
      await course.save();
    }

    return res
      .status(200)
      .json({ sucess: true, message: "Lecture edited successfully", lecture });
  } catch (error) {
    console.log("Error in editing lecture", error);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res
        .status(404)
        .json({ sucess: false, message: "Lecture not found" });
    }

    return res
      .status(200)
      .json({ sucess: true, message: "Lecture fetched successfully", lecture });
  } catch (error) {
    console.log("Error in getting lecture by id", error);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
};


export const removeLecture = async (req, res) => {
  try {
    
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res
        .status(404)
        .json({ sucess: false, message: "Lecture not found" });
    }

    //delete video from cloudinary
    if (lecture.publicId) {
      const publicId = lecture.publicId;
      await deleteVideoFromCloudinary(publicId);
    }

    //delete lecture from course
    const course = await Course.findOne({ lectures: lectureId });
    if (course) {
      course.lectures.pull(lectureId);
      await course.save();
    }

    return res
      .status(200)
      .json({ sucess: true, message: "Lecture deleted successfully" });
    

  } catch (error) {
    console.log("Error in deleting lecture", error);
    return res
      .status(500)
      .json({ sucess: false, message: "Internal server error" });
  }
}
