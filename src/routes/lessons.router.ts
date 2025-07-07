import {Router} from 'express';
import { LessonsController } from "../controllers/lessons.controller";
import { validate } from "../middlewares/validate";
import { lessonSchema } from "../validations/lesson.schema";
import { authMiddleware } from "../middlewares/authMiddleware"; // המידלוור שלך לבדוק שהמשתמש מחובר

const router = Router();
// קבלת כל השיעורים
router.get("/", LessonsController.getAllLessons);
// קבלת שיעור לפי מזהה
router.get("/:id", LessonsController.getLessonById);
// יצירת שיעור חדש
router.post("/", authMiddleware, validate(lessonSchema), LessonsController.createLesson);
// עדכון שיעור קיים
router.put("/:id", authMiddleware, validate(lessonSchema), LessonsController.updateLesson);
// מחיקת שיעור
router.delete("/:id", authMiddleware, LessonsController.deleteLesson);
export default router;