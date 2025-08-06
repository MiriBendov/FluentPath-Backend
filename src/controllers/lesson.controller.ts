import { Request, Response, NextFunction } from "express";
import { LessonService } from "../services/lesson.service";
import { getLessonsSchema } from "../validation/lessons.schema";
import { getNextLessonService } from "../services/lesson.service";
import { ApiError } from "../utils/ApiError";

export const LessonController = {
    async getLessons(req: Request, res: Response, next: NextFunction) {
        const { error, value } = getLessonsSchema.validate(req.query);
        if (error) {
            throw new ApiError(400, error.details[0].message);
        }

        try {
            const lessons = await LessonService.getLessons(value.level as string, value.status as string, value.user_id as string);
            res.json(lessons);
        } catch (error) {
            console.error("Error fetching lessons:", error);
            throw new ApiError(500, "Failed to fetch lessons", error);
        }
    }
};



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
