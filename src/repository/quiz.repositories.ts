import { PrismaClient } from "@prisma/client";
const prisma= new PrismaClient();

export const QuizRepository = {
  async create(data: {
    lessonId: string;
    title: string;
    description: string;
    timeLimit: number;
    passingScore: number;
    maxAttempts: number;
    isFinalExam: boolean;
  }) {
    return prisma.quiz.create({ data });
  },

  async findById(id: string) {
    return prisma.quiz.findUnique({ where: { id } });
  },

  async update(id: string, data: Partial<{
    title: string;
    description: string;
    timeLimit: number;
    passingScore: number;
    maxAttempts: number;
    isFinalExam: boolean;
  }>) {
    return prisma.quiz.update({
      where: { id },
      data,
    });
  },
};