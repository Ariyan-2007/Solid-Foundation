import app from "./app";
import { connectDB } from "./config/dbConfig";
import { PORT } from "./config/appConfig";

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Running on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
