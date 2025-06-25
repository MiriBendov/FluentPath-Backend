import { Request, Response, NextFunction } from "express";
import { loginSchema } from "../validation/auth";

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = loginSchema.validate(req.body, { convert: true });
    if (error) {
        res.status(400).json({ error: "Validation error: " + error.details[0].message });
        return;
    }
    req.body = value; 
    next();
};