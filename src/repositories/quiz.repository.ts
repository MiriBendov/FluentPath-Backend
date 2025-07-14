import { prisma } from "../db/db";

export const getQuizByIdWithQuestions = (quizId: string) => {
    return prisma.quiz.findUnique({
        where: { id: quizId },
        include: { questions: true }
    });
};

export const getLastQuizAttempt = (userId: string, quizId: string) => {
    return prisma.quizAttempt.findFirst({
        where: {
            userId,
            quizId
        },
        orderBy: { attemptNumber: "desc" }
    });
};

export const createQuizAttempt = (data: any) => {
    return prisma.quizAttempt.create({ data });
};
