import Joi from "joi";

export const getNextQuestionSchema = Joi.object({
    questionId: Joi.string().uuid().required(),
    answer: Joi.any().required(),
});
