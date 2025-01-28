import multer from "multer";
import fs from "fs";

//upload media to local directory to be uploaded to cloudinary
export const upload = multer({ dest: "uploads/" });

//delete files from uploads folder
export const deleteLocalMedia = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting file:", err);
    });
}