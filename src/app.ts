import express from "express";
import cors from "cors";
import {errorHandler} from "./middlewares/error.middleware";
import passwordResetRouter from "./routes/passwordReset.routs";
import { notFound } from "./middlewares/not-found.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});
app.use("/api/v1/auth", passwordResetRouter);

app.use(notFound);
app.use(errorHandler);
export default app;
