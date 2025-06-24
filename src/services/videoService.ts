import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createVideo = async (videoData: any) => {
    return await prisma.video.create({
        data: videoData,
    });
};
