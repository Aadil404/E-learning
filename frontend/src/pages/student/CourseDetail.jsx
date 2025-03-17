import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetCourseByIdQuery,
  useGetPublishedCourseByIdQuery,
} from "@/features/api/courseApi";
import { BadgeInfo, Loader2, Lock, PlayCircle } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import ReactPlayer from "react-player";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import PurchaseCourseButton from "@/components/PurchaseCourseButton";

const CourseDetail = () => {
  const { courseId } = useParams();
  const {
    isLoading,
    data: courseData,
    isSuccess,
    isError,
    error,
  } = useGetPublishedCourseByIdQuery(courseId);

  if (isError)
    return (
      <div className="mt-24 text-red-600 text-center font-bold">
        Error: {error?.data?.message}
      </div>
    );

    console.log(courseData);

  return isLoading ? (
    <Loader2 className="w-10 h-10 mt-24 mx-auto" />
  ) : (
    <div className="mt-16 space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-[3%] py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {courseData?.course.title}
          </h1>
          <p className="text-base md:text-lg">{courseData?.course.subTitle}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {courseData?.course.createdBy.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {courseData?.course.createdAt.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {courseData?.course.studentsEnrolled.length}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-[3%] my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(courseData?.course.description),
            }}
          ></p>

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {courseData?.course.lectures.length} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {courseData?.course.lectures.map((lecture, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  {lecture.isPreviewFree ? (
                    <PlayCircle size={24} />
                  ) : (
                    <Lock size={24} />
                  )}
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  url={courseData?.course.lectures[0]?.videoUrl}
                  controls={courseData?.course.lectures[0]?.isPreviewFree}
                />
              </div>
              <b>{courseData?.course.lectures[0]?.lectureTitle}</b>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl ">
                Course Price: <b>₹{courseData?.course.price}</b>
              </h1>
            </CardContent>

            <CardFooter className="flex justify-center p-4">
              {false ? (
                <Button className="w-full">Continue Learning</Button>
              ) : (
                <PurchaseCourseButton />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
