import { Request, Response, NextFunction } from "express";
import { startPlacementTestService, getNextQuestionService, finishPlacementTestService } from "../services/placementTest.service";
import { startPlacementTestSchema, getNextQuestionSchema, finishPlacementTestSchema } from "../utils/validation/placementTest.schema";
import { ApiError } from "../utils/ApiError";

export const startPlacementTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error } = startPlacementTestSchema.validate(req.body);
        if (error) throw new ApiError(400, error.details[0].message);

        const firstQuestion = await startPlacementTestService();
        res.status(200).json({ question: firstQuestion });
    } catch (err) {
        next(err);
    }
};

export const getNextQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = getNextQuestionSchema.validate(req.body);
        if (error) {
            return next(new ApiError(400, error.details[0].message));
        }

        const nextQuestion = await getNextQuestionService(value.questionId, value.answer, value.previousAnswers);
        res.status(200).json({ nextQuestion });
    } catch (err) {
        next(err);
    }
};

export const finishPlacementTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = finishPlacementTestSchema.validate(req.body);
        if (error) {
            return next(new ApiError(400, error.details[0].message));
        }

        const result = await finishPlacementTestService(value.previousAnswers);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
