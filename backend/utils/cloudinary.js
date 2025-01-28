import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//upload media(both image and video) in cloudinary
export const uploadMediaToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            resource_type: "auto",
        });
        return result;
    } catch (error) {
        console.log("Error in uploading media", error);
        return null;
    }
};

export const deleteImageFromCloudinary = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        console.log("Error in deleting image", error);
        return null;
    }
};

export const deleteVideoFromCloudinary = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id, {
            resource_type: "video",
        });
        return result;
    } catch (error) {
        console.log("Error in deleting video", error);
        return null;
    }
};


