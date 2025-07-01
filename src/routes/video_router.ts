import { Router } from "express";
import { VideoController } from "../controllers/videoController";
import { upload } from "../utils/multerConfig";
import { validate } from "../middlewares/validate";
import { videoSchema } from "../validation/video";

const router = Router();

router.post("/upload", upload.single("video"), validate(videoSchema), VideoController.uploadVideo);

export default router;
