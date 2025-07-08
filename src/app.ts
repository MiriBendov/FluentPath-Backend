import express from "express";
import cors from "cors";
import  lessonsRouter  from "./routes/lessons.router";
import errorHandler from "./middlewares/errorHandler";



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is working");
});
app.use("/api/v1/lessons", lessonsRouter);




app.use(errorHandler);
export default app;
