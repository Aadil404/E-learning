import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLecturesQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const navigate = useNavigate();
  const [lectureTitle, setlectureTitle] = useState("");

  const params = useParams();
  const courseId = params.courseId;

  const [createLecture, { isLoading, data, isSuccess, error, isError }] =
    useCreateLectureMutation();

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture created successfully");
      refetch();
    }
    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError]);

  const {
    data: courseLecturesData,
    isLoading: isCourseLecturesLoading,
    isSuccess: isCourseLecturesSuccess,
    isError: isCourseLecturesError,
    refetch,
  } = useGetCourseLecturesQuery(courseId);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets Add lectures and some basic details for your lecture
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
            value={lectureTitle}
            onChange={(e) => setlectureTitle(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
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

        <div className="mt-10">
          {isCourseLecturesLoading ? (
            <p>Lectures loading...</p>
          ) : isCourseLecturesError ? (
            <p>error in getting lectures</p>
          ) : courseLecturesData.lectures.length === 0 ? (
            <p>No lectures found</p>
          ) : (
            courseLecturesData.lectures.map((lecture, index) => (
              <Lecture key={lecture._id} lecture={lecture} index={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
