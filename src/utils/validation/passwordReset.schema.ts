import Joi from "joi";

export const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required()
});

export const resetPasswordSchema = Joi.object({
    userId: Joi.string().uuid().required(),
    token: Joi.string().required(),
    newPassword: Joi.string().min(8).required()
});
