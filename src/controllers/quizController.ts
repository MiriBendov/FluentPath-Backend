import { Request, Response, NextFunction } from "express";
import { QuizService } from "../services/quizService";

export const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quiz = await QuizService.createQuiz(req.body);
    res.status(201).json({ message: "Quiz created", quiz });
  } catch (error) {
    next(error);
  }
};
