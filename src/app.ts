import express from "express";
import cors from "cors";
import video_router from "./routes/video.router";
import {errorHandler} from "./middlewares/error.middleware";



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});
app.use("/api/v1/videos", video_router);


app.use(errorHandler);
export default app;
