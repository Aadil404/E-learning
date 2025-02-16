import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/media";

const LectureTab = () => {
  const navigate = useNavigate();
  const isLoading = false;

  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded / total) * 100));
          },
        });

        if (res.data.sucess) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisabled(false);
          toast.success("Video uploaded successfully");
        }
      } catch (error) {
        console.log("error in uploading video", error);
        toast.error("Error in uploading video");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>This is your Lecture</CardTitle>
          <CardDescription>
            Edit your Lecture from here. click save to save changes
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button className="bg-red-600 hover:bg-red-700">
            Remove Lecture
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5 mt-4">
          <div>
            <Label>
              Lecture Title<span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              name="lectureTitle"
              placeholder="Ex. Introduction to Course"
            />
          </div>

          <div>
            <Label>
              Upload Video<span className="text-red-600">*</span>
            </Label>
            <Input
              type="file"
              onChange={fileChangeHandler}
              accept="video/*"
              name="videoUrl"
            />
          </div>

          {mediaProgress && (
            <div className="my-4">
              <Progress value={uploadProgress} className="w-full" />
              <p>{uploadProgress}%</p>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Label>Free Preview</Label>
            <Switch />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="mr-1 h-4 w-4 animate-spin" />
                  saving
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
