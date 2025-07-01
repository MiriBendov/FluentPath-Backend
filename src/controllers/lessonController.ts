import { Request, Response, NextFunction } from "express";
import { LessonService } from "../services/lessonService";

export const LessonController = {
    async getLessons(req: Request, res: Response, next: NextFunction) {
        const { level, status, user_id } = req.query;

        if (!level || !status || !user_id) {
            return res.status(400).json({ error: "Missing required query parameters" });
        }

        try {
            const lessons = await LessonService.getLessons(level as string, status as string, user_id as string);
            res.json(lessons);
        } catch (error) {
            console.error("Error fetching lessons:", error);
            res.status(500).json({ error: "Failed to fetch lessons" });
        }
    }
};