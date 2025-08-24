import express from "express";
import { createQuestion } from "../controllers/question.controller";
import { updateQuestion } from "../controllers/question.controller";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { createQuestionSchema } from "../utils/validation/question.validation";
import { updateQuestionSchema } from "../utils/validation/question.validation";

const router = express.Router();

router.post("/",authenticateToken,authorizeRoles("admin", "content_manager"),validate(createQuestionSchema),createQuestion);
router.put("/:id",authenticateToken,authorizeRoles("admin", "content_manager"),validate(updateQuestionSchema),updateQuestion);


export default router;
