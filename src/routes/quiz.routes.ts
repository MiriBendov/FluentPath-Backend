import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { submitQuiz, getUserQuizAttempts } from "../controllers/quiz.controller";

const router = Router();

router.post("/:id/submit", authenticateToken, submitQuiz);
router.get("/:id/attempts", authenticateToken, getUserQuizAttempts);

export default router;
