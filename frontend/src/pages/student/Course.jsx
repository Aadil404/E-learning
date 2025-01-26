import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Course = () => {
  return (
    <Card className='className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" cursor-pointer'>
      <div className="relative">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvj2_yxGpaeQaARig2b0TzljTP6KuNpw3UtA&s"
          alt=""
          className="w-full h-36 object-cover rounded-t-lg"
        />
      </div>

      <CardContent className="p-4 space-y-2">
        <p className="hover:underline font-bold text-lg truncate">
          Python courses with practical projects
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-medium text-sm">Jhon Doe python</p>
          </div>
          <Badge>Begineer</Badge>
        </div>
        <div className="text-lg font-bold">
          <span>₹499</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
