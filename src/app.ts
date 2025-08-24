import express from "express";
import cors from "cors";
import { initSentry, Sentry } from "./config/sentry";
import { sentryContextMiddleware } from "./middlewares/sentry.middleware";
import { registerGlobalErrorHandlers } from "./middlewares/globalErrorHandlers";
import { errorHandler } from "./middlewares/error.middleware";
import quizRouter from "./routes/quiz.router";
import questionRouter from "./routes/question.router";
import  lessonsRouter  from "./routes/lessons.router";
import { notFound } from "./middlewares/not-found.middleware";
import placementTestRoutes from "./routes/placementTest.routes";
import passwordResetRouter from "./routes/passwordReset.routes";
import video_router from "./routes/video.routes";
import authRoutes from "./routes/auth.routes";
import quizRoutes from "./routes/quiz.routes";
import videoRoutes from "./routes/video.routes";
import certificateRoutes from "./routes/certificate.routes"
import lessonRoutes from "./routes/lesson.routes"
import "express-async-errors";

initSentry();
registerGlobalErrorHandlers();

const app = express();
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
// הוספת מידע על המשתמש והבקשה לכל אירוע Sentry
app.use(sentryContextMiddleware);
// דוגמה ל־Route שעושה שגיאה לבדיקה
app.get("/boom", (req, res) => {
  throw new Error("בדיקה - בום!");
});
app.get("/", (req, res) => {
    res.send("API is working");
});
app.use("/api/v1/quizzes", quizRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/lessons", lessonsRouter);
app.use("/api/v1/placement-test", placementTestRoutes);
app.use("/api/v1/lessons", lessonsRouter);
app.use("/api/v1/auth", passwordResetRouter);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/videos", videoRoutes);
app.use("/api/v1/certificates", certificateRoutes);
app.use("/api/v1/lessons", lessonRoutes);
app.use(notFound);
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

export default app;
