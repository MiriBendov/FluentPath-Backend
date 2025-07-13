import { PrismaClient } from "@prisma/client";
const prisma= new PrismaClient();

export const QuizRepository = {
  async create(data: {
    lessonId: string;
    title: string;
    description?: string;
    timeLimit: number;
    passingScore: number;
    maxAttempts: number;
    isFinalExam?: boolean;
  }) {
    return prisma.quiz.create({ data });
  },
};