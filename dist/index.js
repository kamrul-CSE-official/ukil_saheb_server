"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const envConfig_1 = __importDefault(require("./configs/envConfig"));
// import { errorLogger, logger } from "./shared/logger";
const port = envConfig_1.default.port;
async function startServer() {
    try {
        await mongoose_1.default.connect(envConfig_1.default.dbUrl).then(() => {
            console.log("Database connected✅");
            app_1.default.listen(port, () => console.log(`Server is running at http://localhost:${port} 🚀`));
        });
    }
    catch (error) {
        console.log("Database or Server error:", error?.message);
    }
}
startServer();
