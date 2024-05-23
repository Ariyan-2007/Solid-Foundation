import express from "express";
import { PORT } from "../config";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Started Listening to Port: ", PORT);
});
