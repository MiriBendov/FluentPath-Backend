import { Request, Response, NextFunction } from "express";
import { generateCertificateService } from "../services/certificate.service";
import { ApiError } from "../utils/ApiError";

export const downloadCertificateController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId;
        const requesterId = req.user?.userId;
        const requesterRole = req.user?.role;

        if (requesterId !== userId && requesterRole !== "admin" && requesterRole !== "org_admin") {
            return next(new ApiError(403, "Access denied"));
        }

        const pdfBuffer = await generateCertificateService(userId);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename="certificate_${userId}.pdf"`);
        res.status(200).send(pdfBuffer);
    } catch (err) {
        next(err);
    }
};
