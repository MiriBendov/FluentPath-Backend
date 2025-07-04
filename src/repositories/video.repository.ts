import { prisma } from '../db/db';
import { CreateVideoInput, UpdateVideoInput } from "../types/video";

export const createVideo = async (data: CreateVideoInput) => {
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

export const updateVideo = async (id: string, data: UpdateVideoInput) => {
    return prisma.video.update({
        where: { id },
        data,
    });
};

export const softDeleteVideo = async (id: string) => {
    return prisma.video.update({
        where: { id },
        data: { isActive: false },
    });
};