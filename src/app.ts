import express from "express";
import cors from "cors";

import errorHandler from "./middlewares/errorHandler";
import auth_router from "./routes/auth_router";



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});

app.use("/api/v1/auth/login", auth_router);

app.use(errorHandler);
export default app;
