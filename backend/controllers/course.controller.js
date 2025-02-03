import Course from "../models/course.model.js";


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
      const courses = await Course.find({createdBy: userId});
      if(courses. length === 0){
          return res.status(404).json({sucess: false, message: "Courses not found", courses:[]})
      }
      return res.status(200).json({sucess: true, message: "All admin courses fetched successfully", courses})
  } catch (error) {
    console.log("Error in getting all admin courses", error);
    return res.status(500).json({sucess: false, message: "Internal server error"})
  }
}
