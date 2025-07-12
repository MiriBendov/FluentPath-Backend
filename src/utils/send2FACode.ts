import nodemailer from "nodemailer";
import { sendSMS } from "./sendSMS";
import { EMAIL_USER, EMAIL_PASS, NODE_ENV } from "../config";

export const generate2FACode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit numeric code
};

export const send2FACode = async (
    method: "email" | "sms",
    destination: string,
    code: string
) => {
    if (method === "email") {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
            ...(NODE_ENV !== "production"
                ? { tls: { rejectUnauthorized: false } }
                : {}),
        });

        await transporter.sendMail({
            from: `"Fluent Path" <${EMAIL_USER}>`,
            to: destination,
            subject: "קוד אימות דו-שלבי",
            text: `קוד האימות שלך הוא: ${code}`,
            html: `<p>קוד האימות שלך הוא: <b>${code}</b></p>`,
        });
    } else {
        await sendSMS(destination, `קוד האימות שלך הוא: ${code}`);
    }
};