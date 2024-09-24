import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { connectToDatabase } from "./db";
import routes from "./routes";
import { HOST, MONGO_URI, PORT, swaggerDocs } from "./helpers/globalHelper";
import swaggerUi from "swagger-ui-express";
import { dbErrorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const startServer = () => {
  const server = http.createServer(app);

  server.listen(PORT, HOST, () => {
    console.log(`Server running on - http://${HOST}:${PORT}`);
  });
};

if (MONGO_URI) {
  connectToDatabase(MONGO_URI)
    .then(() => {
      startServer();
    })
    .catch((error) => {
      console.error(
        "Failed to start server due to DB connection issue:",
        error
      );
    });
} else {
  console.error("Database URI broken or not found. Please fix and re-run.");
  process.exit(1);
}

app.use("/", routes());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(dbErrorHandler);
