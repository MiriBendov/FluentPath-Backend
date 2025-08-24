import { Router } from "express";
import { recordVideoView, VideoController, createVideo, updateVideo, deleteVideo } from "../controllers/video.controller";
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


router.post(
    "/",
    authenticateToken,
    authorizeRoles("content_manager", "admin"),
    createVideo
);

router.put(
    "/:id",
    authenticateToken,
    authorizeRoles("content_manager", "admin"),
    updateVideo
);

router.delete(
    "/:id",
    authenticateToken,
    authorizeRoles("admin"),
    deleteVideo
);

export default router;