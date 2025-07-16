import { Request, Response, NextFunction } from "express";
import { QuestionService } from "../services/questionService";


export const createQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const question = await QuestionService.createQuestion(req.body);
    res.status(201).json({ message: "Question created", question });
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questionId = req.params.id;
    const data = req.body;

    const updated = await QuestionService.updateQuestion(questionId, data);
    res.status(200).json({ message: "Question updated", question: updated });
  } catch (error) {
    next(error);
  }
};

