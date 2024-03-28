"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const envConfig_1 = __importDefault(require("./configs/envConfig"));
const logger_1 = require("./shared/logger");
const port = envConfig_1.default.port;
async function startServer() {
    try {
        await mongoose_1.default.connect(envConfig_1.default.dbUrl).then(() => {
            logger_1.logger.info("Database connected✅");
            app_1.default.listen(port, () => logger_1.logger.info(`Server is running at http://localhost:${port} 🚀`));
        });
    }
    catch (error) {
        logger_1.errorLogger.error("Database or Server error:", error?.message);
    }
}
startServer();
