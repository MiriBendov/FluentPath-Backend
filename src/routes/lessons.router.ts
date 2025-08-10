import {Router} from 'express';
import { LessonsController } from "../controllers/lessons.controller";
import { validate } from "../middlewares/validate";
import { lessonSchema } from "../validation/lesson.schema";
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

// קבלת כל השיעורים
router.get("/",authenticateToken,authorizeRoles("admin, content_manager"), LessonsController.getAllLessons);
// קבלת שיעור לפי מזהה
router.get("/:id",authenticateToken, LessonsController.getLessonById);
// יצירת שיעור חדש
router.post("/",authenticateToken,authorizeRoles("admin, content_manager"),LessonsController.createLesson);
// עדכון שיעור קיים
router.put("/:id", authenticateToken,authorizeRoles("admin, content_manager"), LessonsController.updateLesson);
// מחיקת שיעור
router.delete("/:id",authenticateToken,authorizeRoles("admin, content_manager"), LessonsController.deleteLesson);
export default router;