import Joi from "joi";

export const createVideoSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  fileUrl: Joi.string().uri().required(),
  thumbnailUrl: Joi.string().uri().required(),
  duration: Joi.number().positive().required(),
  level: Joi.string().valid(
    "beginner",
    "elementary",
    "pre_intermediate",
    "intermediate",
    "upper_intermediate"
  ).required(),
  lessonId: Joi.string().uuid().required(),
  orderInLesson: Joi.number().integer().min(1).required(),
  transcript: Joi.string().allow('', null)
});