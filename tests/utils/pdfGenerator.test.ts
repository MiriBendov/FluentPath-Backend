import { generateCertificatePDF } from "../../src/utils/pdfGenerator";

describe("generateCertificatePDF", () => {
    it("should generate a PDF buffer", async () => {
        const data = { fullName: "John Doe", completionDate: new Date("2025-07-23") };
        const pdfBuffer = await generateCertificatePDF(data);

        expect(pdfBuffer).toBeInstanceOf(Buffer);
        expect(pdfBuffer.length).toBeGreaterThan(0);
    });
});
