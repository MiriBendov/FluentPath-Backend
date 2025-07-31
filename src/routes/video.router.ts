import { Router } from "express";
import { VideoController } from "../controllers/video.controller";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

router.post("/upload",authenticateToken,authorizeRoles("admin","content_manager"),VideoController.uploadVideo);

export default router;
