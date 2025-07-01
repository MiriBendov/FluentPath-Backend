import express from "express";
import cors from "cors";
import videoRoutes from "./routes/video.routes";
import { notFound } from "./middlewares/not-found.middleware";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});
app.use("/api/v1", videoRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
