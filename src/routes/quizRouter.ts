import express from "express";
import { createQuiz ,updateQuiz} from "../controllers/quizController";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { createQuizSchema, updateQuizSchema } from "../utils/validation/quizValidation"

const router = express.Router();

router.post("/",authenticateToken,authorizeRoles("content_manager", "admin"),validate(createQuizSchema), createQuiz);
router.put("/:id",authenticateToken,authorizeRoles("admin", "content_manager"),validate(updateQuizSchema),updateQuiz);




export default router;
