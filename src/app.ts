import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import quizRouter from "./routes/quiz.router";
import questionRouter from "./routes/question.router";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});
app.use("/api/v1/quizzes", quizRouter);
app.use("/api/v1/questions", questionRouter);
app.use(errorHandler);

export default app;
