import dotenv from "dotenv";

dotenv.config();

export const PORT: number = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : 3000;

export const MONGO_URL: string =
  process.env.MONGO_URL ||
  "mongodb+srv://ariyanjahangireng:admin@cluster0.lgfe8k2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const DOMAIN: string = process.env.DOMAIN || "localhost";
