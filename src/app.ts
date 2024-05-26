import express, { Express } from "express";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import { json, urlencoded } from "express";
import routes from "./routes";

const app: Express = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(compression());

// Routes

app.use("/", routes());

export default app;
