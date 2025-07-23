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

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
 export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const DATABASE_URL = process.env.DATABASE_URL;
 export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT || "3000";