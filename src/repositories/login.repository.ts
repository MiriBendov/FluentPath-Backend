import { prisma } from "../db/db";

export const saveLoginHistory = async (userId: string, ipAddress: string) => {
    return prisma.login.create({
        data: {
            userId,
            ipAddress,
            loginTime: new Date(),
        },
    });
};
