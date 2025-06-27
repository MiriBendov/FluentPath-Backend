import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token not provided" });
        return;
    }
    try {
        const payload = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.user = payload; // שמור את המידע על המשתמש בבקשה
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const user = req.user as any;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: "You are not authorized to access this resource" });
            return;
        }
        next();
    };
};
