import { startPlacementTestService, getNextQuestionService, finishPlacementTestService } from "../../src/services/placementTest.service";
import * as placementRepo from "../../src/repositories/placementTest.repository";
import * as questionRepo from "../../src/repositories/question.repository";
import { ApiError } from "../../src/utils/ApiError";

jest.mock("../../src/repositories/placementTest.repository");
jest.mock("../../src/repositories/question.repository");

describe("Placement Test Service", () => {
    afterEach(() => jest.clearAllMocks());

    describe("startPlacementTestService", () => {
        it("returns first question when no test in progress", async () => {
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(null);
            (questionRepo.getQuestionByDifficulty as jest.Mock).mockResolvedValue({ id: "q1" });
            (placementRepo.createPlacementTestAttempt as jest.Mock).mockResolvedValue({});

            const result = await startPlacementTestService("user123");
            expect(result).toEqual({ id: "q1" });
        });

        it("throws ApiError 400 if test already in progress", async () => {
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue({ completedAt: null });
            try {
                await startPlacementTestService("user123");
            } catch (err) {
                expect(err).toBeInstanceOf(ApiError);
                expect((err as ApiError).message).toContain("already in progress");
                expect((err as ApiError).status).toBe(400);
            }
        });

        it("throws ApiError 404 if no questions available", async () => {
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(null);
            (questionRepo.getQuestionByDifficulty as jest.Mock).mockResolvedValue(null);
            try {
                await startPlacementTestService("user123");
            } catch (err) {
                expect(err).toBeInstanceOf(ApiError);
                expect((err as ApiError).message).toContain("No questions available");
                expect((err as ApiError).status).toBe(404);
            }
        });
    });

    describe("getNextQuestionService", () => {
        const baseAttempt = {
            id: "attempt1",
            completedAt: null,
            startedAt: new Date(Date.now() - 10 * 60 * 1000),
            answers: [],
        };

        it("returns next question for ongoing test", async () => {
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(baseAttempt);
            (questionRepo.getQuestionById as jest.Mock).mockResolvedValue({
                id: "q1",
                correctAnswer: "A",
                points: 5,
                quiz: { lesson: { level: "elementary" } },
            });
            (placementRepo.updatePlacementTestAnswers as jest.Mock).mockResolvedValue(undefined);
            (questionRepo.getQuestionByDifficulty as jest.Mock).mockResolvedValue({ id: "q2" });

            const result = await getNextQuestionService("user123", "q1", "A");
            expect(result.finished).toBe(false);
            expect(result.nextQuestion).toEqual({ id: "q2" });
        });

        it("returns finished=true if time exceeded", async () => {
            const expired = { ...baseAttempt, startedAt: new Date(Date.now() - 46 * 60 * 1000) };
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(expired);

            const result = await getNextQuestionService("user123", "q1", "A");
            expect(result.finished).toBe(true);
            expect(result.reason).toContain("Time limit");
        });

        it("returns finished=true if 30 questions answered", async () => {
            const fullAttempt = { ...baseAttempt, answers: Array(30).fill({}) };
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(fullAttempt);
            (questionRepo.getQuestionById as jest.Mock).mockResolvedValue({
                id: "q1",
                correctAnswer: "A",
                points: 5,
                quiz: { lesson: { level: "elementary" } },
            });

            const result = await getNextQuestionService("user123", "q1", "A");
            expect(result.finished).toBe(true);
            expect(result.reason).toContain("Max questions");
        });

        it("throws ApiError 404 if attempt not found", async () => {
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(null);
            try {
                await getNextQuestionService("user123", "q1", "A");
            } catch (err) {
                expect(err).toBeInstanceOf(ApiError);
                expect((err as ApiError).message).toContain("not found");
                expect((err as ApiError).status).toBe(404);
            }
        });

        it("throws ApiError 400 if test already completed", async () => {
            const completed = { ...baseAttempt, completedAt: new Date() };
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(completed);
            try {
                await getNextQuestionService("user123", "q1", "A");
            } catch (err) {
                expect(err).toBeInstanceOf(ApiError);
                expect((err as ApiError).message).toContain("already completed");
                expect((err as ApiError).status).toBe(400);
            }
        });

        it("throws ApiError 404 if question not found", async () => {
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(baseAttempt);
            (questionRepo.getQuestionById as jest.Mock).mockResolvedValue(null);
            try {
                await getNextQuestionService("user123", "qX", "A");
            } catch (err) {
                expect(err).toBeInstanceOf(ApiError);
                expect((err as ApiError).message).toContain("not found");
                expect((err as ApiError).status).toBe(404);
            }
        });

        it("returns finished=true if no next question", async () => {
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(baseAttempt);
            (questionRepo.getQuestionById as jest.Mock).mockResolvedValue({
                id: "q1",
                correctAnswer: "A",
                points: 5,
                quiz: { lesson: { level: "elementary" } },
            });
            (placementRepo.updatePlacementTestAnswers as jest.Mock).mockResolvedValue(undefined);
            (questionRepo.getQuestionByDifficulty as jest.Mock).mockResolvedValue(null);

            const result = await getNextQuestionService("user123", "q1", "A");
            expect(result.finished).toBe(true);
            expect(result.reason).toContain("No more questions");
        });
    });

    describe("finishPlacementTestService", () => {
        it("calculates score and assigns level", async () => {
            const answers = [
                { isCorrectAnswer: true, points: 10 },
                { isCorrectAnswer: false, points: 10 },
                { isCorrectAnswer: true, points: 10 },
            ];
            const attempt = { id: "a1", completedAt: null, answers };
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(attempt);
            (placementRepo.savePlacementTestResult as jest.Mock).mockResolvedValue(undefined);

            const result = await finishPlacementTestService("user123");
            expect(result.starting_level).toBe("intermediate");
            expect(result.score).toBe(67);
        });

        it("assigns beginner level for 0%", async () => {
            const attempt = { id: "a1", completedAt: null, answers: [{ isCorrectAnswer: false, points: 10 }] };
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(attempt);
            (placementRepo.savePlacementTestResult as jest.Mock).mockResolvedValue(undefined);

            const result = await finishPlacementTestService("user123");
            expect(result.starting_level).toBe("beginner");
        });

        it("assigns upper_intermediate for 100%", async () => {
            const answers = Array(5).fill({ isCorrectAnswer: true, points: 10 });
            const attempt = { id: "a1", completedAt: null, answers };
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(attempt);
            (placementRepo.savePlacementTestResult as jest.Mock).mockResolvedValue(undefined);

            const result = await finishPlacementTestService("user123");
            expect(result.starting_level).toBe("upper_intermediate");
        });

        it("throws ApiError 400 if test already completed", async () => {
            const attempt = { id: "a1", completedAt: new Date(), answers: [] };
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(attempt);
            try {
                await finishPlacementTestService("user123");
            } catch (err) {
                expect(err).toBeInstanceOf(ApiError);
                expect((err as ApiError).message).toContain("already completed");
                expect((err as ApiError).status).toBe(400);
            }
        });

        it("throws ApiError 404 if attempt not found", async () => {
            (placementRepo.getPlacementTestAttemptByUser as jest.Mock).mockResolvedValue(null);
            try {
                await finishPlacementTestService("user123");
            } catch (err) {
                expect(err).toBeInstanceOf(ApiError);
                expect((err as ApiError).message).toContain("not found");
                expect((err as ApiError).status).toBe(404);
            }
        });
    });
});
