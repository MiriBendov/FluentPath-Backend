import { prisma } from "../db/db";
export const LessonRepository = {
    findLessonsByLevelAndStatus: (level: string, status: string, userId: string) =>
        prisma.lesson.findMany({
            where: {
                level: level as any,
                progresses: {
                    some: {
                        userId: userId,
                        status: status as any,
                    }
                }
            },
            include: { progresses: true },
        }),
};

export const getLessonsProgressByUser = async (userId: string) => {
    return prisma.userProgress.findMany({
        where: { userId },
        include: {
            lesson: true,
        },
    });
};

export const LessonRepository = {
    findLessonsByLevelAndStatus: (level: string, status: string, userId: string) =>
        prisma.lesson.findMany({
            where: {
                level: level as any,
                progresses: {
                    some: {
                        userId: userId,
                        status: status as any,
                    }
                }
            },
            include: { progresses: true },
        }),
};
