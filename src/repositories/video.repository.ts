import { prisma } from '../db/db';

export const createVideo = async (data: any) => {
    return prisma.video.create({ data });
};

export const findLessonById = async (lessonId: string) => {
    return prisma.lesson.findUnique({
        where: { id: lessonId },
    });
};
