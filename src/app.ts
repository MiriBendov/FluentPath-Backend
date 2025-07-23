import express from "express";
import cors from "cors";
import { initSentry, Sentry } from "./config/sentry";
import { errorHandler } from "./middlewares/error.middleware";
import { sentryContextMiddleware } from "./middlewares/sentry.middleware";
import { registerGlobalErrorHandlers } from "./middlewares/globalErrorHandlers";

import "express-async-errors";

initSentry();
registerGlobalErrorHandlers();

const app = express();

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(express.json());
// הוספת מידע על המשתמש והבקשה לכל אירוע Sentry
app.use(sentryContextMiddleware);



// דוגמה ל־Route שעושה שגיאה לבדיקה
app.get("/boom", (req, res) => {
  throw new Error("בדיקה - בום!");
});

app.get("/", (req, res) => {
    res.send("API is working");
});


app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

export default app;
