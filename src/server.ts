import app from "./app";
import { connectDB } from "./config/dbConfig";
import { DOMAIN, PORT } from "./config/appConfig";

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Running on http://${DOMAIN}:${PORT}/`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
