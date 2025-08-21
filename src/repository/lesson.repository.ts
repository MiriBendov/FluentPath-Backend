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