import mongoose from "mongoose";
import app from "./app";
import env from "./configs/envConfig";
import { errorLogger, logger } from "./shared/logger";

const port = env.port;

async function startServer() {
  try {
    await mongoose.connect(env.dbUrl as string).then(() => {
      logger.info("Database connected✅");

      app.listen(port, () =>
        logger.info(`Server is running at http://localhost:${port}/api/v1 🚀`)
      );
    });
  } catch (error: any) {
    errorLogger.error("Database or Server error:", error?.message);
  }
}

startServer();