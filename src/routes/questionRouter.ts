import express from "express";
import { createQuestion } from "../controllers/questionController";
import { updateQuestion } from "../controllers/questionController";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate";
import { createQuestionSchema } from "../utils/validation/questionValidation";
import { updateQuestionSchema } from "../utils/validation/questionValidation";

const router = express.Router();

router.post("/",authenticateToken,authorizeRoles("admin", "content_manager"),validate(createQuestionSchema),createQuestion);
router.put("/:id",authenticateToken,authorizeRoles("admin", "content_manager"),validate(updateQuestionSchema),updateQuestion);


export default router;
