import { Request, Response, NextFunction } from "express";
import { PasswordResetService } from "../services/passwordResetService";

export const PasswordResetController = {
    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { identity_number } = req.body;
            await PasswordResetService.forgotPassword(identity_number);

            res.status(200).json({ message: "If the email exists, a reset link has been sent." });
        } catch (err) {
            next(err);
        }
    },

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, token, newPassword } = req.body;
            await PasswordResetService.resetPassword(userId, token, newPassword);

            res.status(200).json({ message: "Password has been reset successfully" });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    }
};
