import { Router } from "express";
import { getNextLesson } from "../controllers/lesson.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/next", authenticateToken, getNextLesson);

export default router;
