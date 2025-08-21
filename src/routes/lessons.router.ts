import {Router} from 'express';
import { LessonsController } from "../controllers/lessons.controller";
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware';
import { LessonController } from "../controllers/lesson.controller";



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





router.get("/",authenticateToken,LessonController.getLessons);
export default router;