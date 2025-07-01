import { Router } from "express";
import { createVideo, updateVideo } from "../controllers/video.controller";
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

export default router;