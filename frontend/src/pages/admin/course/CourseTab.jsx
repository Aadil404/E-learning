import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
} from "@/features/api/courseApi";
import { Loader, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const isPublished = true;
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [previewThumbnail, setpreviewThumbnail] = useState();

  //get file
  const getThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });

      //for preview of uploaded thumbnail
      const fileReader = new FileReader();
      fileReader.onloadend = () => setpreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const [editCourse, { isLoading, isError, isSuccess, error, data }] =
    useEditCourseMutation();

  const updateCourseHandler = async () => {
    const formData = new FormData();

    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ formData, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
      toast.success(data?.message || "Course edited successfully");
    }
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError]);

  const {
    isLoading: courseIsLoading,
    data: courseData,
    isSuccess: courseIsSuccess,
    isError: courseIsError,
    error: courseError,
    refetch,
    isFetching: courseIsFetching,
  } = useGetCourseByIdQuery(courseId);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (courseIsSuccess && !courseIsFetching) {
      setInput({
        courseTitle: courseData?.course?.title,
        subTitle: courseData?.course?.subTitle,
        description: courseData?.course?.description,
        coursePrice: courseData?.course?.price,
        category: courseData?.course?.category,
        courseLevel: courseData?.course?.level,
      });

      setpreviewThumbnail(courseData?.course?.thumbnail);
    }
  }, [courseIsSuccess, courseIsFetching]);

  return (courseIsLoading || courseIsFetching) ? (
    <Loader2 className="animate-spin" />
  ) : (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>This is your Course</CardTitle>
          <CardDescription>
            Edit your course from here. cliclk save to save changes
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5 mt-4">
          <div>
            <Label>Course Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Python Development"
            />
          </div>

          <div>
            <Label>Course SubTitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a python developer in 30 days"
            />
          </div>

          <div>
            <Label>Course Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select
                value={input.category || courseData?.course?.category}
                onValueChange={(e) => setInput({ ...input, category: e })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="mern">MERN Stack</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="cpp">C++</SelectItem>
                    <SelectItem value="dsa">DSA</SelectItem>
                    <SelectItem value="nextjs">NEXT JS</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="frontend">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="backend">Backend Development</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select
                value={input.courseLevel || courseData?.course?.level}
                onValueChange={(e) => setInput({ ...input, courseLevel: e })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="Ex. 999"
                className="w-fit"
              />
            </div>
          </div>

          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              name="courseThumbnail"
              onChange={getThumbnail}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                alt="preview thumbnail"
                className="h-32 object-cover mt-2"
              />
            )}
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader className="mr-1 h-4 w-4 animate-spin" />
                  saving
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
