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




export const getLessonsProgressByUser = async (userId: string) => {
    return prisma.userProgress.findMany({
        where: { userId },
        include: {
            lesson: true,
        },
    });
};
