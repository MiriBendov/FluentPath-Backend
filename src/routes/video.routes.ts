import { Router } from "express";
import { recordVideoView, VideoController } from "../controllers/video.controller";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

router.post(
    "/:id/view",
    authenticateToken,
    recordVideoView
);

router.post(
    "/upload",
    authenticateToken,
    authorizeRoles("admin", "content_manager"),
    VideoController.uploadVideo
);

export default router;