import { Layers3Icon, School, User } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";
import DarkMode from "./DarkMode";
import MobileUserMenu from "./MobileUserMenu";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Navbar = () => {
  const user = true;

  //logout logic
  const [logoutUser, {data, isSuccess}] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logoutUser();
    navigate("/login");
  }

  //show succesful logout message
  useEffect(() => {
    if(isSuccess){
      toast.success(data.message || "Logout Successfully");
    }
  },[isSuccess])
  
  return (
    <div className="flex items-center justify-between h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">

      {/* e-leraning logo */}
      <div className="flex items-center gap-2 pl-[5%]">
        <Layers3Icon size={35} />
        <h1 className="font-extrabold text-2xl">E-Learning</h1>
      </div>

      {/* user icon and dark mode icon  */}

      {/* for big screen */}
      <div className="hidden md:flex items-center gap-5 pr-[5%]">
        {user ? (
          <UserMenu logoutHandler={logoutHandler}/>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline"> Login</Button>
            <Button>Signup</Button>
          </div>
        )}

        <DarkMode/>
      </div>

        {/* for small screen */}
      <div className="md:hidden pr-[5%]">
        <MobileUserMenu user={user} logoutHandler={logoutHandler}/>
      </div>

    </div>
  );
};

export default Navbar;
