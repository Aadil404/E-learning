import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course?._id}`}>
      <Card className='className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" cursor-pointer'>
        <div className="relative">
          <img
            src={course?.thumbnail || "https://placehold.co/600x400"}
            alt=""
            className="w-full h-36 object-cover rounded-t-lg"
          />
        </div>

        <CardContent className="p-4 space-y-2">
          <p className="hover:underline font-bold text-lg truncate">
            {course?.title}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    course?.createdBy?.photoURL ||
                    "https://github.com/shadcn.png"
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-medium text-sm">{course?.createdBy?.name}</p>
            </div>
            <Badge>{course?.level}</Badge>
          </div>
          <div className="text-lg font-bold">
            <span>₹{course?.price}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
