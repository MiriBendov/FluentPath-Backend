import { Router } from "express";
import { startPlacementTest, getNextQuestion, finishPlacementTest } from "../controllers/placementTest.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/start", authenticateToken, startPlacementTest);
router.post("/next-question", authenticateToken, getNextQuestion);
router.post("/finish", authenticateToken, finishPlacementTest);

export default router;