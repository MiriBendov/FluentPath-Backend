import { Request, Response, NextFunction } from "express";
import { QuizService } from "../services/quiz.services";
import {createQuizSchema, updateQuizSchema,idParamSchema} from "../utils/validation/quiz.validation"
import { ApiError } from "../utils/ApiError";

export const createQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const { error, value } = createQuizSchema.validate(req.body);
        if (error) {
            throw new ApiError(400, error.details[0].message);
        }
    const quiz = await QuizService.createQuiz(value);
    res.status(201).json({ message: "Quiz created", quiz });
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { error: bodyError, value } = updateQuizSchema.validate(req.body);
    if (bodyError) {
        throw new ApiError(400, bodyError.details[0].message);
    }
    
    
            const { error: paramsError } = idParamSchema.validate(req.params);
    if (paramsError) {
        throw new ApiError(400, paramsError.details[0].message);
    }
    const quizId = req.params.id;
    const updatedQuiz = await QuizService.updateQuiz(quizId, value);
    res.status(200).json({ message: "Quiz updated", quiz: updatedQuiz });
  } catch (error) {
    next(error);
  }
};

