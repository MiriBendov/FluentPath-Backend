import { QuizRepository } from "../repository/quiz.repositories";
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
  }
)
  
   {
    
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



   async updateQuiz(id: string, data: Partial<{
    title: string;
    description: string;
    timeLimit: number;
    passingScore: number;
    maxAttempts: number;
    isFinalExam: boolean;
  }>) {
    const quiz = await QuizRepository.findById(id);
    if (!quiz) {
      throw new ApiError(404, "Quiz not found");
    }

    if (Object.keys(data).length === 0) {
      throw new ApiError(400, "No data provided for update");
    }

    return QuizRepository.update(id, data);
  },
};
