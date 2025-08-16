import Joi from "joi";

export const idParamSchema = Joi.object({
  id: Joi.string().uuid().required()
});
export const createQuizSchema = Joi.object({
  lessonId: Joi.string().uuid().required(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(500).required(),
  timeLimit: Joi.number().integer().min(1).max(180).required(),
  passingScore: Joi.number().integer().min(0).max(100).required(),
  maxAttempts: Joi.number().integer().min(1).max(10).required(),
  isFinalExam: Joi.boolean().optional(),
});

export const updateQuizSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(5).max(500).optional(),
  timeLimit: Joi.number().integer().min(1).max(180).optional(),
  passingScore: Joi.number().integer().min(0).max(100).optional(),
  maxAttempts: Joi.number().integer().min(1).max(10).optional(),
  isFinalExam: Joi.boolean().optional(),
}).min(1);