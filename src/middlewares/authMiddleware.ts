import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// הגדרת ממשק לבקשה עם פרטי המשתמש  
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // אם אין Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized - No token provided' });
        return ;
    }

    const token = authHeader.split(' ')[1];

    try {
        // אימות הטוקן  
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string; role: string };

        // שמירת פרטי המשתמש בבקשה
        req.user = decoded;

        // בדיקת תפקיד
        if (decoded.role !== 'content_manager' && decoded.role !== 'admin') {
            res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
            return ;
        }

        // הכל תקין - ממשיכים
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized - Invalid token' });
        return ;
    }
};
