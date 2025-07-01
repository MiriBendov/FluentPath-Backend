import express from "express";
import cors from "cors";
import video_router from "./routes/video_router";
import lessonsRouter from "./routes/lessons_router";
import errorHandler from "./middlewares/errorHandler";
import passwordResetRouter from "./routes/passwordResetRouts";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});
app.use("/api/v1/videos", video_router);

app.use("/api/v1/lessons", lessonsRouter);
app.use("/api/v1/auth", passwordResetRouter);

app.use(errorHandler);
export default app;
