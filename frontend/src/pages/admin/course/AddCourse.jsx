import { Button } from "@/components/ui/button";
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
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const navigate = useNavigate();

  //call api for create course
  const [createCourse, {data, isLoading, error, isSuccess, isError}] = useCreateCourseMutation();

  const [title, settitle] = useState("");
  const [category, setCategory] = useState("");

  const createCourseHandler = async () => {
    await createCourse({ title, category });
  };

  //toast message 
  useEffect(() => {
    if(isSuccess){
        toast.success(data?.message || "Course created successfully");
    }
    if(isError){
        toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError])


  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets Add Course and some basic details for your course
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum,
          suscipit.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>

        <div>
          <Label>Category</Label>
          <Select onValueChange={(e) => setCategory(e)}>
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
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="backend">Backend Development</SelectItem>
                <SelectItem value="mongodb">MongoDB</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                <span>creating</span>
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
