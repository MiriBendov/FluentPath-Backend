import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";
import { AuthenticatedUser } from "../types/auth";
import { ApiError } from "../utils/ApiError";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return next(new ApiError(401, "Token not provided"));
    }
    try {
        const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as AuthenticatedUser;
        req.user = payload;
        next();
    } catch (err) {
        return next(new ApiError(403, "Invalid token"));
    }
};

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = req.user as AuthenticatedUser;
        if (!user || !roles.includes(user.role)) {
            return next(new ApiError(403, "You are not authorized to access this resource"));
        }
        next();
    };
};