import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config";
import { ApiError } from "../utils/ApiError";

export const generateAccessToken = (user: any) => {
    return jwt.sign(
        { userId: user.id, role: user.role },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
};

export const generateRefreshToken = (user: any) => {
    return jwt.sign(
        { userId: user.id },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

export const verifyRefreshToken = (refreshToken: string): any => {
    try {
        return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(403, "Invalid refresh token");
    }
};

export const verifyAccessToken = (token: string): any => {
    try {
        return jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(403, "Invalid access token");
    }
};