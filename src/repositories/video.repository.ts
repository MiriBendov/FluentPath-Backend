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