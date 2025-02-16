import express from 'express';
import { deleteLocalMedia, upload } from '../utils/multer.js';
import { uploadMediaToCloudinary } from '../utils/cloudinary.js';

const router = express.Router();

router.route("/upload-video").post(upload.single("file"), async (req, res) => {
    try {
        const result = await uploadMediaToCloudinary(req.file.path);

        //delete local media (uplaods folder) after we upload video to cloudinary
        deleteLocalMedia(req.file.path);
        
        return res.status(200).json({sucess: true, message: "Media uploaded successfully", data: result})
    } catch (error) { 
        console.log("Error in uploading media", error);
        return res.status(500).json({sucess: false, message: "Internal server error"})
    }
})

export default router;