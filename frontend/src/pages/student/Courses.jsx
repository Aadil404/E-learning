import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const {data: courseData, isLoading, isSuccess} = useGetPublishedCourseQuery();

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-10">Popular Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : isSuccess ? (
            courseData.courses.map((course, index) => <Course key={index} course={course}/>) 
          ) : <div className="text-red-600 text-center"> Error in getting data, try again later </div>}
        </div>
      </div>
    </div>
  );
};

export default Courses;

//Use to show a placeholder while content is loading.
const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
