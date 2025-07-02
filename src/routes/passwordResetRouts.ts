import { Router } from "express";
import { PasswordResetController } from "../controllers/passwordResetController";
import { validate } from "../middlewares/validate";
import { forgotPasswordSchema, resetPasswordSchema } from "../validation/passwordReset";

const router = Router();

router.post("/forgot-password", validate(forgotPasswordSchema), PasswordResetController.forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), PasswordResetController.resetPassword);

export default router;
