import { Router, Request, Response, RequestHandler, NextFunction } from "express";
import multer from "multer";
import { uploadToS3 } from "../services/s3"; //כדי להעלות ל-S3, יש להפעיל את הפונקציה הזו
import { PrismaClient } from "@prisma/client";
import { createVideo } from "../services/videoService";
import { upload } from "../utils/multerConfig"
import { validateVideo } from "../middlewares/validateVideo";


const router = Router();

const uploadVideo = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return next(new Error("No file uploaded"));
    }

    try {
         const { title, level, lessonId, description,thumbnailUrl,duration,orderInLesson, transcript } = req.body;
    const file_url = `/videos/${req.file.originalname}`;
        // במידה ורוצים להעלות ל-S3, מבטלים את ההערות פה:
        // const s3Result = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
        // const fileUrl = s3Result.Location;

        // כרגע שמירת כתובת דמה
        

         const video = await createVideo({
            title,
            level,
            lessonId,
            description,
            thumbnailUrl,
            duration: parseInt(duration, 10),
            orderInLesson: parseInt(orderInLesson, 10),
            transcript,
            fileUrl: file_url,
        });

        res.json({
            id: video.id,
            url: video.fileUrl,
            message: "File saved locally (S3 upload disabled for now)",
        });

    } catch (error) {
        next(error);
    }
};

router.post("/", upload.single("video"), validateVideo, uploadVideo);


export default router;
