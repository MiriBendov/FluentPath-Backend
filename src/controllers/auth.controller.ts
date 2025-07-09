import { Request, Response, NextFunction } from "express";
import { loginService, verify2FACodeService, refreshTokenService, logoutService } from "../services/auth.service";
import { ApiError } from "../utils/ApiError";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { identity_number, password } = req.body;
        const result = await loginService(identity_number, password);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const verify2FACode = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { identity_number, code } = req.body;
        if (!identity_number || !code)
            throw new ApiError(400, "Missing identity number or code");

        const result = await verify2FACodeService(identity_number, code);
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
