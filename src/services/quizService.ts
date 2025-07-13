import { QuizRepository } from "../repository/quizRepository";
import { ApiError } from "../utils/ApiError";

export const QuizService = {
  async createQuiz(input: {
    lessonId: string;
    title: string;
    description?: string;
    timeLimit: number;
    passingScore: number;
    maxAttempts: number;
    isFinalExam?: boolean;
  }) {
    const {lessonId,title,description,timeLimit,passingScore,maxAttempts,isFinalExam,} = input;

     if (!lessonId || !title || !description || !timeLimit || !passingScore || !maxAttempts) {
      throw new ApiError(400, "Missing required fields");
    }

    return QuizRepository.create({
      lessonId,
      title,
      description,
      timeLimit,
      passingScore,
      maxAttempts,
      isFinalExam: isFinalExam ?? false,
    });
  },
};
