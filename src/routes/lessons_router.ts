import { Router} from "express";
import { PrismaClient} from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const { level, status, user_id } = req.query;
    if (!level || !status || !user_id) {
        return res.status(400).json({ error: "Missing required query parameters" });
    }
    
    try {
        const lessons = await prisma.lesson.findMany({
            where: {
                level: level as any, // אם תרצי אפשר להמיר ל: level: level as Level
                progresses: {
                    some: {
                        userId: user_id as string,
                        status: status as any, // אפשר גם: status: status as ProgressStatus
                    }
                }
            },
            include: {
                progresses: true, // אם את רוצה גם את ההתקדמויות שיחזרו איתן
            }
        });

        res.json(lessons);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).json({ error: "Failed to fetch lessons" });
    }
});

export default router;
