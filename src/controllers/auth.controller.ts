import { Request, Response } from "express";
import { loginService, refreshTokenService, logoutService } from "../services/auth.service";

export const login = async (req: Request, res: Response) => {
    try {
        const { identity_number, password } = req.body;
        const result = await loginService(identity_number, password);
        res.json(result);
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message || "Server error" });
    }
};

export const refresh = async (req: Request, res: Response) => {
    try {
        const { refresh_token } = req.body;
        const result = await refreshTokenService(refresh_token);
        res.json(result);
    } catch (error: any) {
        res.status(error.status || 403).json({ message: error.message || "Invalid token" });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Missing token in permissions" });
            return;
        }
        const token = authHeader.split(" ")[1];
        await logoutService(token);
        res.json({ message: "Logged out successfully" });
    } catch (error: any) {
        res.status(error.status || 400).json({ message: error.message || "Error logging out" });
    }
};
