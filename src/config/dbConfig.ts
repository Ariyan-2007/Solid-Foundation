import mongoose from "mongoose";
import { MONGO_URL } from "./appConfig";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

mongoose.connection.on("error", (error: Error) => console.log(error));
