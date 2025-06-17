import { Router } from "express";
import { loginSchema } from "../validation/auth";

const router = Router();

function checkUser(identity_number: string, password: string): "ok" | "invalid_id" | "invalid_password" {
    // Simulate a user check. In a real application, this would query a database.
    if (identity_number !== "123456789") return "invalid_id";
    if (password !== "password123") return "invalid_password";
    return "ok";
}

router.post("/login", (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({error: "Validation error: " + error.details[0].message });
    }
    const { identity_number, password } = req.body;

   const checkResult = checkUser(identity_number, password);
    if (checkResult === "invalid_id") {
        return res.status(401).json({ error: "Invalid identity number" });
    }
    if (checkResult === "invalid_password") {
        return res.status(401).json({ error: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful" });
});

export default router;