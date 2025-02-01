import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {

  //for getting user profile data when user hit /profile url
  const {
    isLoading: isLoading,
    data: data,
    refetch: refetch,
    isFetching: isFetching,
  } = useLoadUserQuery();     


  //get user data
  const user = data?.user || {};


  //for updating user profile data when user click on Update profile button
  const [
    updateUser,
    {
      isLoading: isUpdating,
      data: updatedData,
      error: updateError,
      isError: updateIsError,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdateUserMutation();     


  //refetch user data whenever profile component re-render
  useEffect(()=>{
    refetch();
  },[])


  //state variables for edit user form

  const [name, setName] = React.useState("");
  const [profilePhoto, setProfilePhoto] = React.useState("");


  //for handling update from input
  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };


  //logic for save update buttoon
  const updateUserHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!name || !profilePhoto) {
      toast.error("Please provide both name and profile photo");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);

    await updateUser(formData); //calling updateUser function from authApi
  };


  //for showing success and error messages
  useEffect(() => {
    if(updateIsSuccess){
      refetch();
      toast.success(updatedData?.message || "Profile updated successfully");
    }
    if(updateIsError){
      toast.error(updateError?.message || "Failed to update profile");
    }
    
  }, [updateIsSuccess, updateIsError]);


  return (isLoading || isFetching) ? (
    "Loading..."
  ) : (
    <div className="max-w-4xl mx-auto my-24 px-4">
      <h1 className="font-bold text-2xl text-center md:text-left">
        My Profile
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user.photoURL}
              alt="@shadcn"
              className="rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col gap-3 text-xl">
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 ">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.name}
              </span>
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 ">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.email}
              </span>
            </p>
          </div>

          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100 ">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.role?.toUpperCase()}
              </span>
            </p>
          </div>

          {/* edit profile dialog box */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-[150px]">Update Profile</Button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 px-0">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Profile Photo
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="profilePhoto"
                    onChange={onChangeHandler}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={isUpdating}
                  onClick={updateUserHandler}
                  type="submit"
                  className="w-[150px]"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* show enrolled courses */}
      <div className="my-5">
        <h1 className="font-bold text-xl">Courses you have enrolled in.</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-5">
          {user.enrolledCourses?.length === 0 ? (
            <p>You haven't enrolled in any courses yet</p>
          ) : (
            user.enrolledCourses?.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
