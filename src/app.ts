import express from "express";
import cors from "cors";
import auth_router from "./routes/auth_router";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});

app.use("/auth", auth_router);

export default app;