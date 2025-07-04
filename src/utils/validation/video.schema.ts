import Joi from "joi";

export const videoViewSchema = Joi.object({
  watch_time: Joi.number().min(1).required(),
  completed: Joi.boolean().required(),
});