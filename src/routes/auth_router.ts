import { Router,RequestHandler  } from "express";
import { loginSchema } from "../validation/auth";
import { validate } from "../middlewares/validate";
import { loginHandler } from "../controllers/authController";


const router = Router();
router.post("/", validate(loginSchema), loginHandler);
export default router;