import { prisma } from "../db/db";
import { $Enums } from "@prisma/client";

export const getQuestionByDifficulty = async (level: string, excludedIds: string[]) => {
    const enumLevel = level as $Enums.Level;

    return prisma.question.findFirst({
        where: {
            quiz: {
                lesson: {
                    level: enumLevel
                }
            },
            id: { notIn: excludedIds },
        },
        orderBy: { orderInQuiz: "asc" },
        include: {
            quiz: {
                include: {
                    lesson: true,
                },
            },
        },
    });
};

export const getQuestionById = async (questionId: string) => {
    return prisma.question.findUnique({
        where: { id: questionId },
        include: {
            quiz: {
                include: {
                    lesson: true,
                },
            },
        },
    })
};
