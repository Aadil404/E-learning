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
import { Switch } from "@/components/ui/switch";
import { Loader } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LectureTab = () => {
  const navigate = useNavigate();
  const isLoading = false;
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
            <Input type="file" accept="video/*" name="videoUrl" />
          </div>

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
