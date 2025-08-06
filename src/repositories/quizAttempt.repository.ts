import { prisma } from "../db/db";

export const getPassedFinalExamAttempt = async (userId: string) => {
    return prisma.quizAttempt.findFirst({
        where: {
            userId,
            passed: true,
            quiz: { isFinalExam: true }
        },
        orderBy: { completedAt: "desc" },
        select: { id: true, completedAt: true }
    });
};
