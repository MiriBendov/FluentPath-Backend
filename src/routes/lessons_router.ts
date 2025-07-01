import { Router } from "express";

import { LessonController } from "../controllers/lessonController";

const router = Router();

router.get("/",LessonController.getLessons);
export default router;