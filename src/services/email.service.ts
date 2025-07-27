import nodemailer from "nodemailer";

export async function sendResetEmail(to: string, resetLink: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: '"Fluent Path" <your-email@gmail.com>',
        to,
        subject: "Password Reset Request",
        html: `<p>You requested a password reset. Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a><p>If you did not request this, please ignore this email.</p>`
    };

    await transporter.sendMail(mailOptions);
}
