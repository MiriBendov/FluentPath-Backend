import Joi from "joi";


export const videoSchema = Joi.object({
    title: Joi.string().required(),
    level: Joi.string().valid('beginner', 'elementary', 'pre_intermediate', 'intermediate', 'upper_intermediate').required(),
    lessonId: Joi.string().required(),
    description: Joi.string().required(),
    thumbnailUrl: Joi.string().uri().required(),
    duration: Joi.number().integer().positive().required(),
    orderInLesson: Joi.number().integer().min(1).required(),
    transcript: Joi.string().required(),
});

