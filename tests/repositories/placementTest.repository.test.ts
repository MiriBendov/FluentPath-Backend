import * as placementRepo from "../../src/repositories/placementTest.repository";
import { prisma } from "../../src/db/db";
import { Level } from "@prisma/client";

jest.mock("../../src/db/db", () => ({
    prisma: {
        placementTestAttempt: {
            create: jest.fn(),
            findFirst: jest.fn(),
            update: jest.fn(),
        },
    },
}));

describe("placementTest.repository", () => {
    afterEach(() => jest.clearAllMocks());

    it("createPlacementTestAttempt should call prisma.create with correct data", async () => {
        await placementRepo.createPlacementTestAttempt("user123");
        expect(prisma.placementTestAttempt.create).toHaveBeenCalledWith({
            data: {
                userId: "user123",
                score: 0,
                startingLevel: "beginner",
                answers: [],
            },
        });
    });

    it("getPlacementTestAttemptByUser should call prisma.findFirst with correct filter", async () => {
        await placementRepo.getPlacementTestAttemptByUser("user123");
        expect(prisma.placementTestAttempt.findFirst).toHaveBeenCalledWith({
            where: { userId: "user123" },
            orderBy: { startedAt: "desc" },
        });
    });

    it("updatePlacementTestAnswers should call prisma.update with attemptId and answers", async () => {
        const answers = [{ questionId: "q1", answer: "A" }];
        await placementRepo.updatePlacementTestAnswers("attempt1", answers);
        expect(prisma.placementTestAttempt.update).toHaveBeenCalledWith({
            where: { id: "attempt1" },
            data: { answers },
        });
    });

    it("savePlacementTestResult should call prisma.update with score and level", async () => {
        await placementRepo.savePlacementTestResult("attempt1", 75, Level.pre_intermediate);
        expect(prisma.placementTestAttempt.update).toHaveBeenCalledWith({
            where: { id: "attempt1" },
            data: {
                score: 75,
                startingLevel: Level.pre_intermediate,
                completedAt: expect.any(Date),
            },
        });
    });
});
