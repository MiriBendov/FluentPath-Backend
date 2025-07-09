import { prisma } from "../db/db";

export const findUserByIdentityNumber = async (identityNumber: string) => {
    return prisma.user.findUnique({
        where: { identityNumber },
    });
};

export const findUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: { id },
    });
};

export const updateLastLogin = async (userId: string, date: Date) => {
    return prisma.user.update({
        where: { id: userId },
        data: { lastLogin: date },
    });
};

export const update2FACode = async (userId: string, code: string, expires: Date) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            twoFactorCode: code,
            twoFactorExpires: expires,
        },
    });
};

export const clear2FACode = async (userId: string) => {
    return prisma.user.update({
        where: { id: userId },
        data: {
            twoFactorCode: null,
            twoFactorExpires: null,
        },
    });
};