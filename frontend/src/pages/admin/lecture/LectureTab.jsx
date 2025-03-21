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
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8080/api/media";

const LectureTab = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { courseId, lectureId } = params;

  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);

  // upload video file handler
  const fileChangeHandler = async (e) => {
    setBtnDisabled(true);
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

  const {
    isLoading: lectureIsLoading,
    isError: lectureIsError,
    isSuccess: lectureIsSuccess,
    error: lectureError,
    data: lectureData,
    refetch,
    isFetching: lectureIsFetching,
  } = useGetLectureByIdQuery(lectureId);

  useEffect(() => {
    if (lectureIsSuccess && lectureData) {
      setTitle(lectureData.lecture.lectureTitle);
      setUploadVideoInfo({
        videoUrl: lectureData.lecture.videoUrl,
      });
      setIsFree(lectureData.lecture.isPreviewFree);
    }
  }, [lectureIsSuccess]);

  const [editLecture, { isLoading, isError, isSuccess, error, data }] =
    useEditLectureMutation();

  // save lecture handler
  const saveLectureHandler = async () => {
    await editLecture({
      courseId,
      lectureId,
      lectureTitle: title,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture updated successfully");
      refetch();
      navigate(-1);
    } else if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError]);

  const [
    removeLecture,
    {
      isLoading: removeLectureIsLoading,
      isError: removeLectureIsError,
      isSuccess: removeLectureIsSuccess,
      error: removeLectureError,
      data: removeLectureData,
    },
  ] = useRemoveLectureMutation();

  const removeLectureHandler = async () => {
    await removeLecture({ lectureId });
  };

  useEffect(() => {
    if (removeLectureIsSuccess) {
      toast.success(
        removeLectureData?.message || "Lecture removed successfully"
      );
      refetch();
      navigate(-1);
    } else if (removeLectureIsError) {
      toast.error(removeLectureError?.data?.message || "Something went wrong");
    }
  }, [removeLectureIsSuccess, removeLectureIsError]);

  return lectureIsLoading || lectureIsFetching ? (
    <Loader2 className="animate-spin" />
  ) : (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>This is your Lecture</CardTitle>
          <CardDescription>
            Edit your Lecture from here. click save to save changes
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={removeLectureHandler}
            disabled={removeLectureIsLoading}
          >
            {removeLectureIsLoading && <Loader className="animate-spin" />}
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
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Ex. Introduction to Course"
            />
          </div>

          <div>
            <Label>Upload Video</Label>
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

          {/* display video if uploaded */}
          {uploadVideoInfo && uploadVideoInfo.videoUrl && (
            <video
              src={uploadVideoInfo.videoUrl}
              controls
              className="w-fit h-60"
            ></video>
          )}

          <div className="flex items-center space-x-2">
            <Label>Free Preview</Label>
            <Switch
              checked={isFree}
              onCheckedChange={() => {
                setIsFree(!isFree);
              }}
            />
          </div>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button disabled={btnDisabled} onClick={saveLectureHandler}>
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
