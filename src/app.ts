import express from "express";
import cors from "cors";
import video_router from "./routes/video_router";
import lessonsRouter from "./routes/lessons_router";
import errorHandler from "./middlewares/errorHandler";
import auth_router from "./routes/auth_router";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});

app.use("/auth", auth_router);
app.use("/upload", video_router);
app.use("/lessons", lessonsRouter);

app.use(errorHandler);
export default app;
