import Course from "../models/course.model.js";

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
