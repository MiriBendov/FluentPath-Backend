import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { NODE_ENV } from "../config";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isDev = NODE_ENV === "development";

    const status = err instanceof ApiError ? err.status : 500;
    const message = err.message || "Internal Server Error";
    const details = err.details || undefined;

    // לוגים לקונסול רק בפיתוח
    if (isDev) {
        console.error("Error:", {
            message,
            status,
            stack: err.stack,
            path: req.originalUrl,
            method: req.method,
        });
    }

    const responsePayload: Record<string, any> = { message };

    // הוספת פרטים נוספים רק ב־dev
    if (isDev && details) responsePayload.details = details;
    if (isDev && err.stack) responsePayload.stack = err.stack;

    res.status(status).json(responsePayload);
};