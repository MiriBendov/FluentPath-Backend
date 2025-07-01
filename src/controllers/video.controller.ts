import { Request, Response, NextFunction } from "express";
import { createVideoSchema } from "../utils/validation/video.schema";
import { createVideoService } from "../services/video.service";
import { ApiError } from "../utils/ApiError";

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
