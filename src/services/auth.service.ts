import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken } from "../utils/jwt";
import { findUserById, findUserByIdentityNumber, update2FACode, clear2FACode, updateLastLogin } from "../repositories/user.repository";
import { ApiError } from "../utils/ApiError";
import { send2FACode, generate2FACode } from "../utils/send2FACode";

export const checkPassword = async (plainPassword: string, hash: string) => {
    return bcrypt.compare(plainPassword, hash);
};

export const loginService = async (identity_number: string, password: string) => {
    const user = await findUserByIdentityNumber(identity_number);
    if (!user) throw new ApiError(401, "User not found");

    const isValid = await checkPassword(password, user.passwordHash);
    if (!isValid) throw new ApiError(401, "Incorrect password");

    // If the user is an admin, send 2FA code
    if (user.role === "admin") {
        const code = generate2FACode();
        const expires = new Date(Date.now() + 5 * 60 * 1000); // Code expires in 5 minutes

        await update2FACode(user.id, code, expires);

        const method = user.email ? "email" : "sms";
        const destination = user.email || user.phone || "";

        if (!destination) throw new ApiError(400, "Missing email or phone for 2FA");

        await send2FACode(method, destination, code);

        return { requires2fa: true, message: "Verification code sent" };
    }

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

export const verify2FACodeService = async (identityNumber: string, code: string) => {
    const user = await findUserByIdentityNumber(identityNumber);
    if (!user) throw new ApiError(404, "User not found");

    if (!user.twoFactorCode || !user.twoFactorExpires)
        throw new ApiError(400, "2FA code missing");

    if (user.twoFactorExpires < new Date())
        throw new ApiError(400, "2FA code expired");

    if (user.twoFactorCode !== code)
        throw new ApiError(401, "Invalid 2FA code");

    await clear2FACode(user.id);
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
