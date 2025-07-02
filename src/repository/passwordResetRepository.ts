import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PasswordResetRepository = {
    findUserByIdentity: (identity_number: string) => prisma.user.findUnique({ where: { identityNumber: identity_number } }),

    createResetToken: (userId: string, tokenHash: string, expiresAt: Date) =>
        prisma.passwordResetToken.create({
            data: { userId, tokenHash, expiresAt }
        }),

    findValidToken: (userId: string) =>
        prisma.passwordResetToken.findFirst({
            where: { userId, used: false, expiresAt: { gt: new Date() } }
        }),

    markTokenAsUsed: (tokenId: string) =>
        prisma.passwordResetToken.update({ where: { id: tokenId }, data: { used: true } }),

    updateUserPassword: (userId: string, passwordHash: string) =>
        prisma.user.update({ where: { id: userId }, data: { passwordHash } }),
};
