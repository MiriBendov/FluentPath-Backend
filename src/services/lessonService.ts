import { LessonRepository } from "../repository/lessonRepository";

export const LessonService = {
    async getLessons(level: string, status: string, userId: string) {
        return LessonRepository.findLessonsByLevelAndStatus(level, status, userId);
    }
};