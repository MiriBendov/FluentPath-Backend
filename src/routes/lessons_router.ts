import { Router, Request, Response } from "express";
import { PrismaClient} from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
    const { level, status, user_id } = req.query;

    if (!level || !status || !user_id) {
        res.status(400).json({ error: "Missing required query parameters" });
        return;
    }

    try {
        const lessons = await prisma.lesson.findMany({
            where: {
                level: level as any,
                progresses: {
                    some: {
                        userId: user_id as string,
                        status: status as any,
                    }
                }
            },
            include: { progresses: true },
        });

        res.json(lessons);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).json({ error: "Failed to fetch lessons" });
    }
});

export default router;
