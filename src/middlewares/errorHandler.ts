import { ErrorRequestHandler } from "express";
import multer from "multer";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // שגיאת Multer
    if (err instanceof multer.MulterError) {
        res.status(400).json({ error: err.message });
        return ;
    }

    // שגיאת ולידציה של Joi
    if (err.isJoi) {
         res.status(400).json({ error: err.details[0].message });
         return
    }

    // שגיאה מותאמת אישית של סוג קובץ
    if (err.message === "Invalid file type. Only video/audio files are allowed.") {
         res.status(400).json({ error: err.message });
         return;
    }
    // שגיאה מותאמת אישית של מחיקת שיעור עם סרטונים פעילים
     if (err.message === "Cannot delete lesson with active videos") {
        res.status(400).json({ error: err.message });
        return;
    }

    // שגיאה כללית
    console.error(err.stack);
    res.status(500).json({ error: err.message || "Internal Server Error" });
};

export default errorHandler;
