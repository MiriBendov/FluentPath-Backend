import express from "express";
import { createQuiz } from "../controllers/quizController";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/",authenticateToken,authorizeRoles("content_manager", "admin"),createQuiz);

export default router;
