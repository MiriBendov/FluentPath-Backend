import { Request, Response, NextFunction } from "express";
import { LessonService } from "../services/lesson.service";
import { ApiError } from "../utils/ApiError";
import { getLessonsSchema } from "../validation/lessons.schema";

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