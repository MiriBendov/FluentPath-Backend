import { Router } from "express";
import { VideoController } from "../controllers/video.controller";
import { upload } from "../utils/multerConfig";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

router.post("/upload",authenticateToken,authorizeRoles("admin","content_manager"), upload.single("video"),  VideoController.uploadVideo);

export default router;
