import dotenv from "dotenv";

dotenv.config();

if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error("Missing ACCESS_TOKEN_SECRET in .env");
}
if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error("Missing REFRESH_TOKEN_SECRET in .env");
}
if (!process.env.DATABASE_URL) {
    throw new Error("Missing DATABASE_URL in .env");
}
if (!process.env.NODE_ENV) {
    throw new Error("Missing NODE_ENV in .env");
}
if (!process.env.EMAIL_USER) {
    throw new Error("Missing EMAIL_USER in .env");
}
if (!process.env.EMAIL_PASS) {
    throw new Error("Missing EMAIL_PASS in .env");
}
if (!process.env.TWILIO_ACCOUNT_SID) {
    throw new Error("Missing TWILIO_ACCOUNT_SID in .env");
}
if (!process.env.TWILIO_AUTH_TOKEN) {
    throw new Error("Missing TWILIO_AUTH_TOKEN in .env");
}
if (!process.env.TWILIO_PHONE_NUMBER) {
    throw new Error("Missing TWILIO_PHONE_NUMBER in .env");
}
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const DATABASE_URL = process.env.DATABASE_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
export const PORT = process.env.PORT || "3000";

