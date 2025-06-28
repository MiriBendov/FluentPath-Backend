import { ErrorRequestHandler } from "express";
import multer from "multer";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).json({ error: err.message });
        return;
    }

    if (err.message === "Invalid file type. Only video/audio files are allowed.") {
        res.status(400).json({ error: err.message });
        return;
    }

    console.error(err.stack);
    res.status(500).json({ error: err.message || "Internal Server Error" });
    return;
};

export default errorHandler;
