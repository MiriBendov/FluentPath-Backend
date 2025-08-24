import { Request, Response, NextFunction } from "express";
import { LessonService } from "../services/lesson.service";
import { getLessonsSchema } from "../utils/validation/lesson.schema";
import { getNextLessonService } from "../services/lesson.service";
import { LessonsService } from "../services/lesson.service";
import { lessonSchema } from "../utils/validation/lesson.schema";
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

export const LessonsController = {
    // שליפת כל השיעורים
    async getAllLessons(req: Request, res: Response, next: NextFunction) {
        try {
            const lessons = await LessonsService.getAllLessons();
            res.json(lessons);
        } catch (err) {
            next(err);
        }
    },

    // שליפת שיעור לפי ID
       async getLessonById(req: Request, res: Response, next: NextFunction) {
        try {
            const lesson = await LessonsService.getLessonById(req.params.id);
            if (!lesson) {
                res.status(404).json({ error: "Lesson not found" });
            }
            res.json(lesson);
        } catch (err) {
            next(err);
        }
    },

    // יצירת שיעור חדש
    async createLesson(req: Request, res: Response, next: NextFunction) {
        try {
             const { error, value } = lessonSchema.validate(req.body);
        if (error) {
            throw new ApiError(400, error.details[0].message);
        }
            const lesson = await LessonsService.createLesson(value);
            res.status(201).json(lesson);
        } catch (err) {
            next(err);
        }
    },

    // עדכון שיעור קיים
    async updateLesson(req: Request, res: Response, next: NextFunction) {
        try {
             const { error, value } = lessonSchema.validate(req.body);
        if (error) {
            throw new ApiError(400, error.details[0].message);
        }
            const lesson = await LessonsService.updateLesson(req.params.id,value);
            res.json(lesson);
        } catch (err) {
            next(err);
        }
    },

    // מחיקת שיעור
    async deleteLesson(req: Request, res: Response, next: NextFunction) {
        try {
            await LessonsService.deleteLesson(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
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
