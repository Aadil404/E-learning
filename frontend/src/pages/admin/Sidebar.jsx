import { ChartColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="flex">
      <div className="hidden sm:block w-[250px] space-y-8 border-r border-gray-300 dark:border-gray-700  p-5 sticky top-0  h-screen">
        <div className="mt-20 space-y-4">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <ChartColumn square={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="/admin/course" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>

      <div className="flex-1 p-14 md:p-20 bg-white">
          <Outlet />
        </div>
    </div>
  );
};

export default Sidebar;
