import Joi from "joi";

export const startPlacementTestSchema = Joi.object({});

export const getNextQuestionSchema = Joi.object({
    questionId: Joi.string().uuid().required(),
    answer: Joi.any().required(),
    previousAnswers: Joi.array().items(
        Joi.object({
            questionId: Joi.string().uuid().required(),
            correct: Joi.boolean().required(),
            questionLevel: Joi.string().valid(
                "beginner",
                "elementary",
                "pre_intermediate",
                "intermediate",
                "upper_intermediate"
            ).required(),
            points: Joi.number().integer().min(0).required(),
        })
    ).required(),
});

export const finishPlacementTestSchema = Joi.object({
    previousAnswers: Joi.array().items(
        Joi.object({
            questionId: Joi.string().uuid().required(),
            correct: Joi.boolean().required(),
            questionLevel: Joi.string().valid(
                "beginner",
                "elementary",
                "pre_intermediate",
                "intermediate",
                "upper_intermediate"
            ).required(),
            points: Joi.number().integer().min(0).required(),
        })
    ).min(1).required(),
});
