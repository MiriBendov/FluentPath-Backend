const Joi= require('joi');

export const loginSchema = Joi.object({
  identity_number: Joi.string().trim().length(9).pattern(/^\d+$/).required(),
  password: Joi.string().trim().pattern(/^(?!\s+$).+/).min(6).required()
});
