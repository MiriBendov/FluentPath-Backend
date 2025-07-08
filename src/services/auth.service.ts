import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken } from "../utils/jwt";
import { findUserById, findUserByIdentityNumber, updateLastLogin } from "../repositories/user.repository";
import { ApiError } from "../utils/ApiError";

export const checkPassword = async (plainPassword: string, hash: string) => {
    return bcrypt.compare(plainPassword, hash);
};

export const loginService = async (identity_number: string, password: string) => {
    const user = await findUserByIdentityNumber(identity_number);
    if (!user) throw new ApiError(401, "User not found");

    const isValid = await checkPassword(password, user.passwordHash);
    if (!isValid) throw new ApiError(401, "Incorrect password");

    await updateLastLogin(user.id, new Date());

    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return {
        token: token,
        refresh_token: refreshToken,
        user: {
            id: user.id,
            identity_number: user.identityNumber,
            first_name: user.firstName,
            last_name: user.lastName,
            role: user.role,
            organization_id: user.organizationId,
        },
    };
};

export const refreshTokenService = async (refreshToken: string) => {
    const payload = verifyRefreshToken(refreshToken);
    const user = await findUserById(payload.userId);
    if (!user) throw new ApiError(403, "Invalid user");

    const newToken = generateAccessToken(user);
    return { token: newToken };
};

export const logoutService = async (accessToken: string) => {
    verifyAccessToken(accessToken); // לוודא שהוא תקף
    // בעתיד: אם יישמר DB של refresh tokens – נמחק אותו כאן
    // blacklist וכו'
};
