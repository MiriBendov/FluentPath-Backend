import crypto from "crypto";
import bcrypt from "bcrypt";
import { sendResetEmail } from "../services/emailService";
import { PasswordResetRepository } from "../repository/passwordResetRepository";

export const PasswordResetService = {
    async forgotPassword(identity_number: string) {
        const user = await PasswordResetRepository.findUserByIdentity(identity_number);
        if (!user) return;

        const token = crypto.randomBytes(32).toString("hex");
        const tokenHash = await bcrypt.hash(token, 10);
        const expiresAt = new Date(Date.now() + 1000 * 60 * 15);

        await PasswordResetRepository.createResetToken(user.id, tokenHash, expiresAt);

        const resetLink = `https://your-frontend.com/reset-password?token=${token}&id=${user.id}`;
        await sendResetEmail(user.email, resetLink);
    },

    async resetPassword(userId: string, token: string, newPassword: string) {
        const record = await PasswordResetRepository.findValidToken(userId);
        if (!record) throw new Error("Invalid or expired token");

        const isValid = await bcrypt.compare(token, record.tokenHash);
        if (!isValid) throw new Error("Invalid or expired token");

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await PasswordResetRepository.updateUserPassword(userId, hashedPassword);
        await PasswordResetRepository.markTokenAsUsed(record.id);
    }
};
