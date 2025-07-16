import { QuestionRepository } from "../repository/questionRepository";
import { QuizRepository } from "../repository/quizRepository";
import { ApiError } from "../utils/ApiError";
import {QuestionType } from "@prisma/client";


export const QuestionService = {
  async createQuestion(data: {
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
    const quiz = await QuizRepository.findById(data.quizId);
    if (!quiz) {
      throw new ApiError(404, "Quiz not found");
    }

    return QuestionRepository.create(data);
  },



  async updateQuestion(id: string, data: Partial<{
    questionText: string;
    questionType: QuestionType;
    options: any;
    correctAnswer: any;
    explanation: string;
    hints: any;
    points: number;
    orderInQuiz: number;
  }>) {
    const existing = await QuestionRepository.findById(id);
    if (!existing) throw new ApiError(404, "Question not found");

    if (Object.keys(data).length === 0) {
      throw new ApiError(400, "No data provided for update");
    }

    return QuestionRepository.update(id, data);
  },
};
