import Joi from "joi";

export const createQuestionSchema = Joi.object({
  quizId: Joi.string().uuid().required(),
  questionText: Joi.string().min(5).max(500).required(),
  questionType: Joi.string()
    .valid("multiple_choice", "fill_blank", "drag_drop", "ordering")
    .required(),
  options: Joi.array().items(Joi.string()).min(1).required(),
  correctAnswer: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string()),
    Joi.object()
  ).required(),
  explanation: Joi.string().min(2).max(1000).required(),
  hints: Joi.array().items(Joi.string()).max(2).required(),
  points: Joi.number().integer().min(1).max(100).required(),
  orderInQuiz: Joi.number().integer().min(1).required(),
});

export const updateQuestionSchema = Joi.object({
  questionText: Joi.string().min(5).max(500).optional(),
  questionType: Joi.string()
    .valid("multiple_choice", "fill_blank", "drag_drop", "ordering")
    .optional(),
  options: Joi.array().items(Joi.string()).min(1).optional(),
  correctAnswer: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string()),
    Joi.object()
  ).optional(),
  explanation: Joi.string().min(2).max(1000).optional(),
  hints: Joi.array().items(Joi.string()).max(2).optional(),
  points: Joi.number().integer().min(1).max(100).optional(),
  orderInQuiz: Joi.number().integer().min(1).optional(),
}).min(1); // לפחות שדה אחד

