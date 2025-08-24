import { LessonsRepository } from "../repository/lessons.repository";
import { getOrSetCache } from "../utils/cacheHelper";
import { redis } from "../utils/redisClient";


export const LessonsService = {
    async getAllLessons() {
         return getOrSetCache("lessons_list", async () => {
            return LessonsRepository.findAll();
        });
    },

    async getLessonById(id: string) {
        return LessonsRepository.findById(id);
    },

    async createLesson(data: any) {
       const lesson = await LessonsRepository.create(data);
        await redis.del("lessons_list");
        return lesson;
    },

    async updateLesson(id: string, data: any) {
        const lesson=await LessonsRepository.update(id, data);
        await redis.del("lessons_list");
        return lesson;
    },

    async deleteLesson(id: string) {
        // בדיקה אם יש סרטונים פעילים לשיעור הזה
        const videoCount = await LessonsRepository.countVideosInLesson(id);
        if (videoCount > 0) {
            throw new Error("Cannot delete lesson with active videos");
        }
        const result = await LessonsRepository.delete(id);
        await redis.del("lessons_list");
        return result;
    }
};
