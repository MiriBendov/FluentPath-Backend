import { Request, Response, NextFunction } from "express";
import { PasswordResetService } from "../services/passwordReset.service";
import { forgotPasswordSchema, resetPasswordSchema } from "../utils/validation/passwordReset.schema";
import { ApiError } from "../utils/ApiError";

export const PasswordResetController = {
    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {

            const { error, value } = forgotPasswordSchema.validate(req.body);
            if (error) {
                throw new ApiError(400, error.details[0].message);
            }
            await PasswordResetService.forgotPassword(value.email);

            res.status(200).json({ message: "If the email exists, a reset link has been sent." });
        } catch (err) {
            next(err);
        }
    },

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {

            const { error, value } = resetPasswordSchema.validate(req.body);
            if (error) {
                throw new ApiError(400, error.details[0].message);
            }
            await PasswordResetService.resetPassword(value.userId, value.token, value.newPassword);

            res.status(200).json({ message: "Password has been reset successfully" });
        } catch (err) {
            next(err);
        }
    }
};
