import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ApiError } from "../utils/ApiError";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, 
      convert: true,     
    });

    if (error) {
      next(new ApiError(400, "Validation error", error.details));
      return ;
    }

    req.body = value; 
    next();
  };
};
