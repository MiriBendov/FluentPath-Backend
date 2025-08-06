import Joi from "joi";

export const submitQuizSchema = Joi.object({
    answers: Joi.object()
        .pattern(
            Joi.string(),
            Joi.alternatives()
                .try(Joi.string(), Joi.array().items(Joi.string()))
        )
        .required(),

    time_taken: Joi.number()
        .integer()
        .positive()
        .required()
});
