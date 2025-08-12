import { Router } from "express";
import { PasswordResetController } from "../controllers/passwordReset.controller";

const router = Router();

router.post("/forgot-password", PasswordResetController.forgotPassword);
router.post("/reset-password", PasswordResetController.resetPassword);

export default router;
