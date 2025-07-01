import { prisma } from '../db/db';

export const createVideo = async (data: any) => {
    return prisma.video.create({ data });
};

export const findLessonById = async (lessonId: string) => {
    return prisma.lesson.findUnique({
        where: { id: lessonId },
    });
};

export const findVideoById = async (id: string) => {
    return prisma.video.findUnique({ where: { id } });
};

export const updateVideo = async (id: string, data: any) => {
    return prisma.video.update({
        where: { id },
        data,
    });
};