import { Router,RequestHandler  } from "express";
import { loginSchema } from "../validation/auth";
import { validate } from "../middlewares/validate";
import { loginController } from "../controllers/authController";


const router = Router();
router.post("/", validate(loginSchema), loginController);
export default router;