import express from "express";
import { login, verify2FACode, refresh, logout } from "../controllers/auth.controller";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/login", login);
router.post("/verify-2fa", verify2FACode);
router.post("/refresh", refresh);
router.post("/logout", authenticateToken, logout);  // רק משתמש מחובר יכול להתנתק

//Route protected for administrators only
router.get("/admin-only", authenticateToken, authorizeRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" });
});
router.get("/org-admin", authenticateToken, authorizeRoles("org_admin"), (req, res) => {
    res.json({ massege: "Welcome org-admin" });
});
router.get("/content-manager", authenticateToken, authorizeRoles("content_manager"), (req, res) => {
    res.json({ massege: "Welcome content-manager" });
});
router.get("/student", authenticateToken, authorizeRoles("student"), (req, res) => {
    res.json({ massege: "Welcome student" });
});

export default router;
