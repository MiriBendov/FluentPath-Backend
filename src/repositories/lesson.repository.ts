import { prisma } from "../db/db";

export const getLessonsProgressByUser = async (userId: string) => {
    return prisma.userProgress.findMany({
        where: { userId },
        include: {
            lesson: true,
        },
    });
};
