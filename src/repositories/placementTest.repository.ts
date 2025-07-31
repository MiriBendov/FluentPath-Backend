import { Level } from "@prisma/client";
import { prisma } from "../db/db";

export const createPlacementTestAttempt = async (userId: string) => {
    return prisma.placementTestAttempt.create({
        data: {
            userId,
            score: 0,
            startingLevel: "beginner",
            answers: [],
        },
    });
};

export const getPlacementTestAttemptByUser = async (userId: string) => {
    return prisma.placementTestAttempt.findFirst({
        where: { userId },
        orderBy: { startedAt: "desc" },
    });
};

export const updatePlacementTestAnswers = async (attemptId: string, answers: any) => {
    return prisma.placementTestAttempt.update({
        where: { id: attemptId },
        data: { answers },
    });
};

export const savePlacementTestResult = async (attemptId: string, score: number, startingLevel: Level) => {
    return prisma.placementTestAttempt.update({
        where: { id: attemptId },
        data: {
            score,
            startingLevel,
            completedAt: new Date(),
        },
    });
};
