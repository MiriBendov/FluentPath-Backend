import { Request, Response, NextFunction } from "express";
import { videoSchema } from "../validation/video";

export const validateVideo = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = videoSchema.validate(req.body, { convert: true });
    if (error) {
         res.status(400).json({ error: error.details[0].message });
         return
    }

    req.body = value; 
    next();
};