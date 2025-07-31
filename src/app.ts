import express from "express";
import cors from "cors";
import video_router from "./routes/video.router";
import {errorHandler} from "./middlewares/error.middleware";
import passwordResetRouter from "./routes/passwordReset.routs";
import { notFound } from "./middlewares/not-found.middleware";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});
app.use("/api/v1/videos", video_router);

app.use("/api/v1/auth", passwordResetRouter);


app.use("/api/v1/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
