import { Router,RequestHandler  } from "express";
import { AuthService } from "../services/authService";
export const loginController: RequestHandler = async (req, res, next) => {
    try {
        const { identity_number, password } = req.body;
         const checkResult = AuthService.checkUser(identity_number, password);
        if (checkResult === "invalid_id") {
            res.status(401).json({ error: "Invalid identity number" });
            return;
        }
        if (checkResult === "invalid_password") {
            res.status(401).json({ error: "Invalid password" });
            return;
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        next(error);
    }
};