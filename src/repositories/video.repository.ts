import { prisma } from '../db/db';
import { CreateVideoViewInput, UpdateVideoViewInput } from "../types/video";

export const findLessonById = async (lessonId: string) => {
    return prisma.lesson.findUnique({
        where: { id: lessonId },
    });
};

export const findVideoById = async (id: string) => {
    return prisma.video.findUnique({ where: { id } });
};

export const getVideoViewByUserAndVideo = async (userId: string, videoId: string) => {
    return prisma.videoView.findUnique({
        where: {
            userId_videoId: { userId, videoId },
        },
    });
};

export const createVideoView = async (data: CreateVideoViewInput) => {
    return prisma.videoView.create({ data });
};

export const updateVideoView = async (id: string, data: UpdateVideoViewInput) => {
    return prisma.videoView.update({
        where: { id },
        data
    });
};