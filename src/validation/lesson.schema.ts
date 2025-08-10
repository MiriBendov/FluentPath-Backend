import Joi from "joi";

// ולידציה ליצירה/עדכון של שיעור
export const lessonSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "שדה 'title' נדרש",
        "string.base": "'title' חייב להיות טקסט"
    }),
    description: Joi.string().required().messages({
        "any.required": "שדה 'description' נדרש",
        "string.base": "'description' חייב להיות טקסט"
    }),
    level: Joi.string()
        .valid('beginner', 'elementary', 'pre_intermediate', 'intermediate', 'upper_intermediate')
        .required()
        .messages({
            "any.required": "שדה 'level' נדרש",
            "any.only": "שדה 'level' חייב להיות אחד מהערכים המותרים"
        }),
    orderInLevel: Joi.number().required().messages({
        "any.required": "שדה 'orderInLevel' נדרש",
        "number.base": "'orderInLevel' חייב להיות מספר"
    }),
    estimatedDuration: Joi.number().required().messages({
        "any.required": "שדה 'estimatedDuration' נדרש",
        "number.base": "'estimatedDuration' חייב להיות מספר"
    }),
    learningObjectives: Joi.object().required().messages({
        "any.required": "שדה 'learningObjectives' נדרש",
        "object.base": "'learningObjectives' חייב להיות אובייקט"
    }),
});
