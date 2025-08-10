import twilio from "twilio";
import { ApiError } from "../utils/ApiError";
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } from "../config/index";

const accountSid = TWILIO_ACCOUNT_SID!;
const authToken = TWILIO_AUTH_TOKEN!;
const from = TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export const sendSMS = async (to: string, message: string) => {
    try {
        await client.messages.create({
            body: message,
            from,
            to,
        });
    } catch (err: any) {
        console.error("Twilio SMS Error:", {
            message: err.message,
            code: err.code,
            status: err.status,
            to,
            from,
        });

        throw new ApiError(502, "Failed to send SMS. Please try again later.", {
            twilioCode: err.code,
            to,
        });
    }
};
