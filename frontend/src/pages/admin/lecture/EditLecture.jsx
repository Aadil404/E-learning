import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const { courseId, lectureId } = params;
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeftIcon />
          </Button>
          <h1 className="font-bold text-xl">Update Your Lecture</h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecture;
