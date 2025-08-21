import { Sentry } from "../config/sentry";
import { Request, Response, NextFunction } from "express";

export const sentryContextMiddleware=(req: Request, res: Response, next: NextFunction): void =>{
  Sentry.setUser(req.user ? {
    id: req.user.userId,
    role: req.user.role,
  } : null);

  Sentry.setContext("request", {
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers,
  });
  next();
}