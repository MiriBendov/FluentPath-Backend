import { Request, Response, NextFunction } from "express";
import { loginService, refreshTokenService, logoutService } from "../services/auth.service";
import { ApiError } from "../utils/ApiError";
import { loginSchema } from "../validation/login.schema";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            throw new ApiError(400, error.details[0].message);
        }
        const result = await loginService(value.identity_number, value.password);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refresh_token } = req.body;
        const result = await refreshTokenService(refresh_token);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Missing token in permissions");
        }
        const token = authHeader.split(" ")[1];
        await logoutService(token);
        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        next(err);
    }
};
