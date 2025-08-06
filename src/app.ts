import express from "express";
import cors from "cors";
import { notFound } from "./middlewares/not-found.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import placementTestRoutes from "./routes/placementTest.routes";
import lessonsRouter from "./routes/lessons.router";
import video_router from "./routes/video.router";
import passwordResetRouter from "./routes/passwordReset.routs";
import authRoutes from "./routes/auth.routes";
import quizRoutes from "./routes/quiz.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});
app.use("/api/v1/placement-test", placementTestRoutes);

app.use(notFound);
app.use(errorHandler);


app.use("/api/v1/lessons", lessonsRouter);

app.use("/api/v1/auth", passwordResetRouter);


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/quizzes", quizRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
