import { prisma } from "../db/db";
import { $Enums } from "@prisma/client";

// export const createAttempt = async (userId: string) => {
//     return prisma.quizAttempt.create({
//       data: {
//         userId,
//         quizId: null, // מבחן מיון לא משויך לשיעור קיים
//         attemptNumber: 1,
//         score: 0,
//         totalQuestions: 0,
//         correctAnswers: 0,
//         timeTaken: 0,
//         answers: [],
//         passed: false,
//         startedAt: new Date(),
//       },
//     });
//   };


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


// export const saveAnswer = async (userId: string, questionId: string, answer: string) => {
//     return prisma.quizAttempt.create({
//         data: {
//             userId,
//             quizId: "placement_test", // מזהה ייחודי למבחן מיון
//             answers: { [questionId]: answer },
//             score: 0,
//             attemptNumber: 1,
//             totalQuestions: 1,
//             correctAnswers: 0,
//             timeTaken: 0,
//             passed: false,
//         },
//     });
// };

// export const getUserAnswers = async (userId: string) => {
//     return prisma.quizAttempt.findMany({
//         where: { userId, quizId: "placement_test" },
//         include: { /* כולל שאלות עם רמת קושי */ },
//     });
// };
