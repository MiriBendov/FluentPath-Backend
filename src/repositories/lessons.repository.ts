import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const LessonsRepository = {
    async findAll() {
        return prisma.lesson.findMany({
            include: { videos: true }
        });
    },

    async findById(id: string) {
        return prisma.lesson.findUnique({
            where: { id },
            include: { videos: true }
        });
    },

    async create(data: any) {
        return prisma.lesson.create({
            data
        });
    },

    async update(id: string, data: any) {
        return prisma.lesson.update({
            where: { id },
            data
        });
    },

    async delete(id: string) {
        return prisma.lesson.delete({
            where: { id }
        });
    },

    async countVideosInLesson(id: string) {
        return prisma.video.count({
            where: { lessonId: id }
        });
    }
};
