import mongoose from "mongoose";
import app from "./app";
import env from "./configs/envConfig";
// import { errorLogger, logger } from "./shared/logger";

const port = env.port;

async function startServer() {
  try {
    await mongoose.connect(env.dbUrl as string).then(() => {
      console.log("Database connected✅");

      app.listen(port, () =>
        console.log(`Server is running at http://localhost:${port} 🚀`)
      );
    });
  } catch (error: any) {
    console.log("Database or Server error:", error?.message);
  }
}

startServer();