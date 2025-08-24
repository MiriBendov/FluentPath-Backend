import { Router } from "express";
import { getNextLesson, LessonController } from "../controllers/lesson.controller";
import { LessonsController } from "../controllers/lesson.controller";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";

const router = Router();

router.get("/next", authenticateToken, getNextLesson);

router.get("/", authenticateToken, LessonController.getLessons);

// קבלת כל השיעורים
router.get("/", authenticateToken, authorizeRoles("admin, content_manager"), LessonsController.getAllLessons);
// קבלת שיעור לפי מזהה
router.get("/:id", authenticateToken, LessonsController.getLessonById);
// יצירת שיעור חדש
router.post("/", authenticateToken, authorizeRoles("admin, content_manager"), LessonsController.createLesson);
// עדכון שיעור קיים
router.put("/:id", authenticateToken, authorizeRoles("admin, content_manager"), LessonsController.updateLesson);
// מחיקת שיעור
router.delete("/:id", authenticateToken, authorizeRoles("admin, content_manager"), LessonsController.deleteLesson);

export default router;
