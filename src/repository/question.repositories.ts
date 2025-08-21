import { PrismaClient ,QuestionType  } from "@prisma/client";
const prisma= new PrismaClient();

export const QuestionRepository = {
  async create(data: {
    quizId: string;
    questionText: string;
    questionType: QuestionType;
    options: any;
    correctAnswer: any;
    explanation: string;
    hints: any;
    points: number;
    orderInQuiz: number;
  }) {
    return prisma.question.create({ data });
  },



   async findById(id: string) {
    return prisma.question.findUnique({ where: { id } });
  },

  async update(id: string, data: Partial<{
    questionText: string;
    questionType: QuestionType;
    options: any;
    correctAnswer: any;
    explanation: string;
    hints: any;
    points: number;
    orderInQuiz: number;
  }>) {
    return prisma.question.update({
      where: { id },
      data,
    });
  },
};
