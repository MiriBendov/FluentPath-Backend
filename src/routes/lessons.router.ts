import { Router } from "express";

import { LessonController } from "../controllers/lesson.controller";
import { authenticateToken } from "../middlewares/auth.middleware";


const router = Router();

router.get("/",LessonController.getLessons);
export default router;