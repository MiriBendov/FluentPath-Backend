import { Request, Response, NextFunction } from "express";
import { QuizRepository } from "../repository/quizRepository";
import { ApiError } from "../utils/ApiError";




export const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lessonId, title, description, timeLimit, passingScore, maxAttempts, isFinalExam } = req.body;

    if (!lessonId || !title || !timeLimit || !passingScore || !maxAttempts) {
      throw new ApiError(400, "Missing required fields");
    }

    const quiz = await QuizRepository.create({
      lessonId,
      title,
      description,
      timeLimit,
      passingScore,
      maxAttempts,
      isFinalExam: isFinalExam ?? false,
    });
    res.status(201).json({ message: "Quiz created", quiz });
  } catch (error) {
    next(error);
  }
};
