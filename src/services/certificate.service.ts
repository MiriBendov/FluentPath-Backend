import { getUserById } from "../repositories/user.repository";
import { getPassedFinalExamAttempt } from "../repositories/quizAttempt.repository";
import { generateCertificatePDF } from "../utils/pdfGenerator";
import { ApiError } from "../utils/ApiError";

export const generateCertificateService = async (userId: string): Promise<Buffer> => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const finalAttempt = await getPassedFinalExamAttempt(userId);
    if (!finalAttempt) {
        throw new ApiError(403, "Certificate not available: final exam not passed");
    }

    const certificateData = {
        fullName: `${user.firstName} ${user.lastName}`,
        completionDate: finalAttempt.completedAt,
    };

    return await generateCertificatePDF(certificateData);
};
