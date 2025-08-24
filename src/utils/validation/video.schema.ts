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
  transcript: Joi.string().required()
});

export const updateVideoSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  fileUrl: Joi.string().uri(),
  thumbnailUrl: Joi.string().uri(),
  duration: Joi.number().positive(),
  level: Joi.string().valid(
    "beginner",
    "elementary",
    "pre_intermediate",
    "intermediate",
    "upper_intermediate"
  ),
  lessonId: Joi.string().uuid(),
  orderInLesson: Joi.number().integer().min(1),
  transcript: Joi.string()
}).min(1);

export const videoViewSchema = Joi.object({
  watch_time: Joi.number().min(1).required(),
  completed: Joi.boolean().required(),
});



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