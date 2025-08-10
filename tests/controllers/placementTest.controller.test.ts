import { startPlacementTest, getNextQuestion, finishPlacementTest, } from "../../src/controllers/placementTest.controller";
import * as service from "../../src/services/placementTest.service";
import { ApiError } from "../../src/utils/ApiError";

jest.mock("../../src/services/placementTest.service");

const mockRequest = (body = {}, user = {}) => ({
    body,
    user,
}) as any;

const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();
    return res;
};

const next = jest.fn();

describe("Placement Test Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("startPlacementTest", () => {
        it("should return 200 with first question", async () => {
            (service.startPlacementTestService as jest.Mock).mockResolvedValue({ id: "q1" });

            const req = mockRequest({}, { userId: "user123" });
            const res = mockResponse();

            await startPlacementTest(req, res, next);

            expect(service.startPlacementTestService).toHaveBeenCalledWith("user123");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ question: { id: "q1" } });
        });

        it("should pass error to next if service fails", async () => {
            (service.startPlacementTestService as jest.Mock).mockRejectedValue(new ApiError(500, "Service error"));

            const req = mockRequest({}, { userId: "user123" });
            const res = mockResponse();

            await startPlacementTest(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(ApiError));
        });
    });

    describe("getNextQuestion", () => {
        it("should return 200 with next question if test not finished", async () => {
            const serviceResponse = {
                nextQuestion: { id: "q2" },
                nextDifficulty: "intermediate",
                finished: false,
            };
            (service.getNextQuestionService as jest.Mock).mockResolvedValue(serviceResponse);

            const req = mockRequest({ questionId: "123e4567-e89b-12d3-a456-426614174000", answer: "A" }, { userId: "user123" });
            const res = mockResponse();

            await getNextQuestion(req, res, next);

            expect(service.getNextQuestionService).toHaveBeenCalledWith("user123", "123e4567-e89b-12d3-a456-426614174000", "A");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                next_question: { id: "q2" },
                next_difficulty: "intermediate",
                finished: false,
            });
        });

        it("should return 200 if test is finished", async () => {
            const serviceResponse = {
                finished: true,
                reason: "Max questions reached",
            };
            (service.getNextQuestionService as jest.Mock).mockResolvedValue(serviceResponse);

            const req = mockRequest({ questionId: "123e4567-e89b-12d3-a456-426614174000", answer: "A" }, { userId: "user123" });
            const res = mockResponse();

            await getNextQuestion(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                finished: true,
                reason: "Max questions reached",
            });
        });

        it("should return 400 if validation fails", async () => {
            const req = mockRequest({ answer: "A" }, { userId: "user123" }); // missing questionId
            const res = mockResponse();

            await getNextQuestion(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(ApiError));
            const err = (next as jest.Mock).mock.calls[0][0];
            expect(err.status).toBe(400);
        });

        it("should pass service error to next", async () => {
            (service.getNextQuestionService as jest.Mock).mockRejectedValue(new ApiError(500, "Service error"));
            const req = mockRequest({ questionId: "q1", answer: "A" }, { userId: "user123" });
            const res = mockResponse();

            await getNextQuestion(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(ApiError));
        });
    });

    describe("finishPlacementTest", () => {
        it("should return 200 with result", async () => {
            const result = { starting_level: "intermediate", score: 70 };
            (service.finishPlacementTestService as jest.Mock).mockResolvedValue(result);

            const req = mockRequest({}, { userId: "user123" });
            const res = mockResponse();

            await finishPlacementTest(req, res, next);

            expect(service.finishPlacementTestService).toHaveBeenCalledWith("user123");
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(result);
        });

        it("should pass error to next if service fails", async () => {
            (service.finishPlacementTestService as jest.Mock).mockRejectedValue(new ApiError(500, "Service error"));

            const req = mockRequest({}, { userId: "user123" });
            const res = mockResponse();

            await finishPlacementTest(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(ApiError));
        });
    });
});
