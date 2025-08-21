import { Router } from "express";
import { recordVideoView } from "../controllers/video.controller";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

router.post(
    "/:id/view",
    authenticateToken,
    recordVideoView
);

export default router;