import { Request, Response, NextFunction } from "express";
import { startPlacementTestService, getNextQuestionService, finishPlacementTestService } from "../services/placementTest.service";
import { getNextQuestionSchema } from "../utils/validation/placementTest.schema";
import { ApiError } from "../utils/ApiError";

export const startPlacementTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const firstQuestion = await startPlacementTestService(userId);
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

        const { userId } = req.user!;
        const result = await getNextQuestionService(userId, value.questionId, value.answer);

        if (result.finished) {
            res.status(200).json({ finished: true, reason: result.reason });
            return;
        }

        res.status(200).json({ next_question: result.nextQuestion, next_difficulty: result.nextDifficulty, finished: false, });
    } catch (err) {
        next(err);
    }
};

export const finishPlacementTest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user!;
        const result = await finishPlacementTestService(userId);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
