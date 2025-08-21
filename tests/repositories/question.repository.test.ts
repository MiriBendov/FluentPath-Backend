import * as questionRepo from "../../src/repositories/question.repository";
import { prisma } from "../../src/db/db";

jest.mock("../../src/db/db", () => ({
    prisma: {
        question: {
            findFirst: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));

describe("question.repository", () => {
    afterEach(() => jest.clearAllMocks());

    it("getQuestionByDifficulty should call prisma.question.findFirst with correct filters", async () => {
        await questionRepo.getQuestionByDifficulty("intermediate", ["q1", "q2"]);
        expect(prisma.question.findFirst).toHaveBeenCalledWith({
            where: {
                quiz: {
                    lesson: {
                        level: "intermediate",
                    },
                },
                id: { notIn: ["q1", "q2"] },
            },
            orderBy: { orderInQuiz: "asc" },
            include: {
                quiz: {
                    include: {
                        lesson: true,
                    },
                },
            },
        });
    });

    it("getQuestionById should call prisma.question.findUnique with correct ID", async () => {
        await questionRepo.getQuestionById("q123");
        expect(prisma.question.findUnique).toHaveBeenCalledWith({
            where: { id: "q123" },
            include: {
                quiz: {
                    include: {
                        lesson: true,
                    },
                },
            },
        });
    });
});
