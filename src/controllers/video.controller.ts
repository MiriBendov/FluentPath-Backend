import { Request, Response, NextFunction } from "express";
import { videoViewSchema } from "../utils/validation/video.schema";
import { recordVideoViewService } from "../services/video.service";
import { ApiError } from "../utils/ApiError";

export const recordVideoView = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = videoViewSchema.validate(req.body);
        if (error) {
            throw new ApiError(400, error.details[0].message);
        }

        const videoId = req.params.id;
        const userId = req.user?.userId;

        await recordVideoViewService({ userId, videoId, ...value });

        res.status(200).json({ message: "Progress saved" });
    } catch (err) {
        next(err);
    }
};

