import mongoose from "mongoose";
import { MONGO_URL, DATABASE_NAME } from "./appConfig";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      dbName: DATABASE_NAME,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

mongoose.connection.on("error", (error: Error) => console.log(error));
