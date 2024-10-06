import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.Promise = Promise;

export const connectToDatabase = async (MONGO_URI: string): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
