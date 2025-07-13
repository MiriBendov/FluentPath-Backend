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

export const updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizId = req.params.id;
    const data = req.body;

    const updatedQuiz = await QuizService.updateQuiz(quizId, data);
    res.status(200).json({ message: "Quiz updated", quiz: updatedQuiz });
  } catch (error) {
    next(error);
  }
};

