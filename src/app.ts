import express, { Express } from "express";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import { json, urlencoded } from "express";
import routes from "./routes";
import fs from "fs";

const app: Express = express();

const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(compression());
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/", routes());

export default app;
