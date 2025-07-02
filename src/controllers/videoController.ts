import { Request, Response, NextFunction } from "express";
import { VideoService } from "../services/videoService";

export const VideoController = {
    async uploadVideo(req: Request, res: Response, next: NextFunction) {
        if (!req.file) {
            return next(new Error("No file uploaded"));
        }

        try {
            const { title, level, lessonId,lessons, description, thumbnailUrl, duration, orderInLesson, transcript } = req.body;
             // במידה ורוצים להעלות ל-S3, מבטלים את ההערות פה:
            // const s3Result = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
            // const file_url = s3Result.Location;

            // כרגע שמירת כתובת דמה
            const file_url = `/videos/${req.file.originalname}`;

            const video = await VideoService.uploadVideo({
                title,
                level,
                lessonId:lessonId.toString(),
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
    }
};
