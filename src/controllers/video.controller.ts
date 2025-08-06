import { Request, Response, NextFunction } from "express";
import { VideoService } from "../services/video.service";
import { videoSchema } from "../validation/video.schema";
import { createVideoSchema, updateVideoSchema } from "../utils/validation/video.schema";
import { createVideoService, updateVideoService, deleteVideoService } from "../services/video.service";
import { ApiError } from "../utils/ApiError";

export const VideoController = {
    async uploadVideo(req: Request, res: Response, next: NextFunction) {
        if (!req.file) {
            return next(new Error("No file uploaded"));
        }

        try {
              const { error, value } = videoSchema.validate(req.body);
        if (error) {
            throw new ApiError(400, error.details[0].message);
        }
             // במידה ורוצים להעלות ל-S3, מבטלים את ההערות פה:
            // const s3Result = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);
            // const file_url = s3Result.Location;

            // כרגע שמירת כתובת דמה
            const file_url = `/videos/${req.file.originalname}`;

            const video = await VideoService.uploadVideo({
                title:value.title,
                level:value.level,
                lessonId:value.lessonId.toString(),
               description:value.description,
                thumbnailUrl:value.thumbnailUrl,
                duration: parseInt(value.duration, 10),
                orderInLesson: parseInt(value.orderInLesson, 10),
                transcript:value.transcript,
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




export const createVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = createVideoSchema.validate(req.body);
        if (error) {
            throw new ApiError(400, error.details[0].message);
        }
        const video = await createVideoService(value);
        res.status(201).json({ message: "Video created", video });
    } catch (err) {
        next(err);
    }
};

export const updateVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = updateVideoSchema.validate(req.body);
        if (error) {
            throw new ApiError(400, error.details[0].message);
        }
        const video = await updateVideoService(req.params.id, value);
        res.status(200).json({ message: "Video updated", video });
    } catch (err) {
        next(err);
    }
};

export const deleteVideo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteVideoService(req.params.id);
        res.status(200).json({ message: "Video deleted successfully" });
    } catch (err) {
        next(err);
    }
};
