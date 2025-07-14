import express from "express";
import cors from "cors";
import { notFound } from "./middlewares/not-found.middleware";
import { errorHandler } from "./middlewares/error.middleware";
import quizRoutes from "./routes/quiz.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});
app.use("/api/v1/quizzes", quizRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
