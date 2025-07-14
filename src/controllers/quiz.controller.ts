import { Request, Response, NextFunction } from "express";
import { submitQuizService } from "../services/quiz.service";
import { submitQuizSchema } from "../utils/validation/quiz.schema";
import { ApiError } from "../utils/ApiError";

export const submitQuiz = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id: quizId } = req.params;

        const { error, value } = submitQuizSchema.validate(req.body);
        if (error) {
            return next(new ApiError(400, error.details[0].message));
        }

        if (!req.user?.userId) {
            return next(new ApiError(401, "Unauthorized"));
        }
        const userId = req.user.userId;

        const result = await submitQuizService(userId, quizId, value.answers, value.time_taken);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
