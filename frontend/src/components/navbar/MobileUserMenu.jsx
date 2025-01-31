import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React from "react";
import DarkMode from "./DarkMode";
import { Link, useNavigate } from "react-router-dom";

const MobileUserMenu = ({ user, logoutHandler }) => {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetDescription>
          Manage your profile and account settings
        </SheetDescription>

        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>{user ? "My Profile" :""}</SheetTitle>
          <DarkMode />
        </SheetHeader>

        {user !== null && (
          <div className="flex flex-col gap-y-4">
            <div><Link to='my-learning'>My Learning</Link></div>
            <div><Link to='profile'>My Profile</Link></div>
            <div onClick={logoutHandler}>Log out</div>
          </div>
        )}

        {user === null && (
          <div className="flex flex-col gap-y-4">
            <Button variant="outline" onClick={() => navigate("/login")}> Login</Button>
            <Button onClick={() => navigate("/login")}>Signup</Button>
          </div>
        )}

        {user?.role === "instructor" && user && (
          <div className="pt-5">
            <Button className="w-full">Dashboard</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MobileUserMenu;
