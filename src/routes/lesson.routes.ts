import { Router } from "express";
import { getNextLesson, LessonController } from "../controllers/lesson.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.get("/next", authenticateToken, getNextLesson);

router.get("/",authenticateToken,LessonController.getLessons);

export default router;
