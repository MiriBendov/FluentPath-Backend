import { Router } from "express";
import { createVideo, updateVideo, deleteVideo } from "../controllers/video.controller";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

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