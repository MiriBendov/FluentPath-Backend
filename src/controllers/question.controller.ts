import { Request, Response, NextFunction } from "express";
import {QuestionService} from "../services/question.service"
import {createQuestionSchema,updateQuestionSchema,idParamSchema } from "../utils/validation/question.validation";
import { ApiError } from "../utils/ApiError";



export const createQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = createQuestionSchema.validate(req.body);
        if (error) {
            throw new ApiError(400, error.details[0].message);
        }
    const question = await QuestionService.createQuestion(value);
    res.status(201).json({ message: "Question created", question });
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: bodyError, value } = updateQuestionSchema.validate(req.body);
if (bodyError) {
    throw new ApiError(400, bodyError.details[0].message);
}


        const { error: paramsError } = idParamSchema.validate(req.params);
if (paramsError) {
    throw new ApiError(400, paramsError.details[0].message);
}
    const questionId = req.params.id;
    const updated = await QuestionService.updateQuestion(questionId, value);
    res.status(200).json({ message: "Question updated", question: updated });
  } catch (error) {
    next(error);
  }
};

