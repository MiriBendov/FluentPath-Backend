import { Request, Response, NextFunction } from "express";
import { LessonsService } from "../services/lessons.service";
import { lessonSchema } from "../validation/lesson.schema";
import { ApiError } from "../utils/ApiError";

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
