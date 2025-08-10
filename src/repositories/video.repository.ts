<<<<<<< HEAD
import { prisma } from "../db/db";
export const VideoRepository = {
    createVideo: (videoData: any) => prisma.video.create({
        data: {
            title: videoData.title,
            level: videoData.level,
            description: videoData.description,
            fileUrl: videoData.fileUrl,
            thumbnailUrl: videoData.thumbnailUrl,
            duration: videoData.duration,
            orderInLesson: videoData.orderInLesson,
            transcript: videoData.transcript,
            lesson: { connect: { id: videoData.lessonId } }
        }
    }),
};
=======
import { prisma } from '../db/db';
import { CreateVideoInput, UpdateVideoInput } from "../types/video";
import { CreateVideoViewInput, UpdateVideoViewInput } from "../types/video";

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



>>>>>>> 37bbb666e584b01805e3459e4b6ed515d7df70a0
