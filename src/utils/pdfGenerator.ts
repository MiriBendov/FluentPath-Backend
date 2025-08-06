import PDFDocument from "pdfkit";
import { format } from "date-fns";

interface CertificateData {
    fullName: string;
    completionDate: Date;
}

export const generateCertificatePDF = async (data: CertificateData): Promise<Buffer> => {
    return new Promise((resolve) => {
        const doc = new PDFDocument({ size: "A4", margin: 50 });
        const buffers: Uint8Array[] = [];

        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
        });

        doc.fontSize(24).text("Certificate of Completion", { align: "center" });
        doc.moveDown(2);
        doc.fontSize(18).text(`This certifies that`, { align: "center" });
        doc.moveDown();
        doc.fontSize(22).text(data.fullName, { align: "center", underline: true });
        doc.moveDown();
        doc.fontSize(16).text(`has successfully completed the course.`, { align: "center" });
        doc.moveDown(2);
        doc.fontSize(14).text(`Date: ${format(data.completionDate, "dd/MM/yyyy")}`, { align: "center" });

        doc.end();
    });
};
