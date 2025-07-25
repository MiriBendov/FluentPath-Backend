import { prisma } from "../db/db";

export const getUserById = async (userId: string) => {
    return prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, firstName: true, lastName: true }
    });
};
