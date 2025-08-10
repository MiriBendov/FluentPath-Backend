import { downloadCertificateController } from "../../src/controllers/certificate.controller";
import * as service from "../../src/services/certificate.service";
import { ApiError } from "../../src/utils/ApiError";

jest.mock("../../src/services/certificate.service");

const mockRequest = (params = {}, user = {}) => ({
    params,
    user
}) as any;

const mockResponse = () => {
    const res: any = {};
    res.setHeader = jest.fn();
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn();
    return res;
};

const next = jest.fn();

describe("downloadCertificateController", () => {
    it("should deny access if not self and not admin", async () => {
        const req = mockRequest({ userId: "2" }, { userId: "1", role: "student" });
        const res = mockResponse();

        await downloadCertificateController(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    });

    it("should send PDF buffer when authorized", async () => {
        (service.generateCertificateService as jest.Mock).mockResolvedValue(Buffer.from("PDF"));
        const req = mockRequest({ userId: "1" }, { userId: "1", role: "student" });
        const res = mockResponse();

        await downloadCertificateController(req, res, next);

        expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/pdf");
        expect(res.send).toHaveBeenCalledWith(expect.any(Buffer));
    });

    it("should return 500 if service fails", async () => {
        (service.generateCertificateService as jest.Mock).mockRejectedValue(new Error("Service error"));
        const req = mockRequest({ userId: "1" }, { userId: "1", role: "student" });
        const res = mockResponse();

        await downloadCertificateController(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(ApiError));
    });
});
