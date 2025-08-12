import Joi from "joi";

export const getLessonsSchema = Joi.object({
  level: Joi.string()
    .valid("beginner", "elementary", "pre_intermediate", "intermediate", "upper_intermediate")
    .required(),
  
  status: Joi.string()
    .valid("not_started", "in_progress", "completed")
    .required(),

  user_id: Joi.string()
    .required(),
});
