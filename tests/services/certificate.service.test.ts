import { generateCertificateService } from "../../src/services/certificate.service";
import * as userRepo from "../../src/repositories/user.repository";
import * as quizRepo from "../../src/repositories/quizAttempt.repository";
import { generateCertificatePDF } from "../../src/utils/pdfGenerator";
import { ApiError } from "../../src/utils/ApiError";

jest.mock("../../src/repositories/user.repository");
jest.mock("../../src/repositories/quizAttempt.repository");
jest.mock("../../src/utils/pdfGenerator", () => ({
    generateCertificatePDF: jest.fn().mockResolvedValue(Buffer.from("PDF"))
}));

describe("generateCertificateService", () => {
    it("should throw 404 if user not found", async () => {
        (userRepo.getUserById as jest.Mock).mockResolvedValue(null);

        await expect(generateCertificateService("123")).rejects.toThrow(ApiError);
    });

    it("should throw 403 if final exam not passed", async () => {
        (userRepo.getUserById as jest.Mock).mockResolvedValue({ firstName: "John", lastName: "Doe" });
        (quizRepo.getPassedFinalExamAttempt as jest.Mock).mockResolvedValue(null);

        await expect(generateCertificateService("123")).rejects.toThrow(ApiError);
    });

    it("should throw 500 if there is a database error", async () => {
        (userRepo.getUserById as jest.Mock).mockRejectedValue(new Error("Database connection error"));

        await expect(generateCertificateService("123")).rejects.toThrow("Database connection error");
    });

    it("should return PDF buffer if all checks pass", async () => {
        (userRepo.getUserById as jest.Mock).mockResolvedValue({ firstName: "John", lastName: "Doe" });
        (quizRepo.getPassedFinalExamAttempt as jest.Mock).mockResolvedValue({ completedAt: new Date() });

        const result = await generateCertificateService("123");
        expect(result).toBeInstanceOf(Buffer);
    });
});
