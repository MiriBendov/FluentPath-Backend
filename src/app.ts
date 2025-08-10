import express from "express";
import cors from "cors";
import  lessonsRouter  from "./routes/lessons.router";
import {errorHandler} from "./middlewares/error.middleware";


import { notFound } from "./middlewares/not-found.middleware";
import placementTestRoutes from "./routes/placementTest.routes";
import video_router from "./routes/video.router";
import passwordResetRouter from "./routes/passwordReset.routs";
import authRoutes from "./routes/auth.routes";
import quizRoutes from "./routes/quiz.routes";
import videoRoutes from "./routes/video.routes";
import certificateRoutes from "./routes/certificate.routes"
import lessonRoutes from "./routes/lesson.routes"

const app = express();

app.set('trust proxy', true);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});
app.use("/api/v1/lessons", lessonsRouter);


app.use("/api/v1/placement-test", placementTestRoutes);

app.use(notFound);
app.use(errorHandler);


app.use("/api/v1/lessons", lessonsRouter);

app.use("/api/v1/auth", passwordResetRouter);


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/videos", videoRoutes);
app.use("/api/v1/certificates", certificateRoutes);

app.use(notFound);
app.use(errorHandler);

app.use("/api/v1/lessons", lessonRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
