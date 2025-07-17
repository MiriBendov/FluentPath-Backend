import { Request, Response, NextFunction } from "express";
import { getNextLessonService } from "../services/lesson.service";
import { ApiError } from "../utils/ApiError";

export const getNextLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user?.userId) {
            return next(new ApiError(401, "Unauthorized"));
        }
        const userId = req.user.userId;

        const nextLesson = await getNextLessonService(userId);

        if (!nextLesson) {
            return next(new ApiError(404, "No next lesson found"));
        }

        res.status(200).json({ lesson: nextLesson });
    } catch (err) {
        next(err);
    }
};
