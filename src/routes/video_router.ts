import { Router } from "express";
import { VideoController } from "../controllers/videoController";
import { upload } from "../utils/multerConfig";
import { videoSchema } from "../validation/video.schema";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

router.post("/upload",authenticateToken,authorizeRoles("admin","content_manager"), upload.single("video"),  VideoController.uploadVideo);

export default router;
