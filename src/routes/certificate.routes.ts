import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { downloadCertificateController } from "../controllers/certificate.controller";

const router = Router();

router.get("/:userId", authenticateToken, downloadCertificateController);

export default router;