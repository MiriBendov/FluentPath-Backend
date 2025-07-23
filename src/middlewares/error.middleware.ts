import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { NODE_ENV } from "../config";
import { Sentry } from "../config/sentry";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const isDev = NODE_ENV === "development";
  const status = err instanceof ApiError ? err.status : 500;
  const message = err.message || "Internal Server Error";
  const details = err.details || undefined;

  if (!isDev) {
    Sentry.captureException(err);
  } else {
    console.error("Error:", { message, status, stack: err.stack });
  }

  const responsePayload: Record<string, any> = { message };
  if (isDev && details) responsePayload.details = details;
  if (isDev && err.stack) responsePayload.stack = err.stack;

  res.status(status).json(responsePayload);
};
