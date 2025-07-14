import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { submitQuiz } from "../controllers/quiz.controller";

const router = Router();

router.post("/:id/submit", authenticateToken, submitQuiz);

export default router;
