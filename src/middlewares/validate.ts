import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, { convert: true });
        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        req.body = value;
        next();
    };
};
