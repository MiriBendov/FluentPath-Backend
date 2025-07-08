import { LessonsRepository } from "../repository/lessons.repository";

export const LessonsService = {
    async getAllLessons() {
        return LessonsRepository.findAll();
    },

    async getLessonById(id: string) {
        return LessonsRepository.findById(id);
    },

    async createLesson(data: any) {
        return LessonsRepository.create(data);
    },

    async updateLesson(id: string, data: any) {
        return LessonsRepository.update(id, data);
    },

    async deleteLesson(id: string) {
        // בדיקה אם יש סרטונים פעילים לשיעור הזה
        const videoCount = await LessonsRepository.countVideosInLesson(id);
        if (videoCount > 0) {
            throw new Error("Cannot delete lesson with active videos");
        }

        return LessonsRepository.delete(id);
    }
};
