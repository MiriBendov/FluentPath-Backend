import { Router } from "express";
import { createVideo } from "../controllers/video.controller";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

router.post(
    "/videos",
    authenticateToken,
    authorizeRoles("content_manager", "admin"),
    createVideo
);

export default router;