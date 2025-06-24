import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const videoSchema = Joi.object({
    title: Joi.string().required(),
    level: Joi.string().valid('beginner', 'elementary', 'pre_intermediate', 'intermediate', 'upper_intermediate').required(),
    lessonId: Joi.string().required(),
    description: Joi.string().required(),
    thumbnailUrl: Joi.string().uri().required(),
    duration: Joi.number().integer().positive().required(),
    orderInLesson: Joi.number().integer().min(1).required(),
    transcript: Joi.string().required(),
});

export const validateVideo = (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = videoSchema.validate(req.body, { convert: true });
    if (error) {
         res.status(400).json({ error: error.details[0].message });
         return
    }

    req.body = value; 
    next();
};