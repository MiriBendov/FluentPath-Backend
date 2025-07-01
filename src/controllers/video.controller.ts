import { Request, Response, NextFunction } from "express";
import { createVideoSchema, updateVideoSchema } from "../utils/validation/video.schema";
import { createVideoService, updateVideoService } from "../services/video.service";
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
