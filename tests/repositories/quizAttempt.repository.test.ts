import { getPassedFinalExamAttempt } from "../../src/repositories/quizAttempt.repository";
import { prisma } from "../../src/db/db";

jest.mock("../../src/db/db", () => ({
    prisma: {
        quizAttempt: { findFirst: jest.fn() }
    }
}));

describe("quizAttempt.repository", () => {
    it("getPassedFinalExamAttempt should call prisma.quizAttempt.findFirst with correct filters", async () => {
        await getPassedFinalExamAttempt("123");
        expect(prisma.quizAttempt.findFirst).toHaveBeenCalledWith({
            where: { userId: "123", passed: true, quiz: { isFinalExam: true } },
            orderBy: { completedAt: "desc" },
            select: { id: true, completedAt: true }
        });
    });
});
