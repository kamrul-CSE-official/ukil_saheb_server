"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const { combine, timestamp, label, printf, prettyPrint } = winston_1.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${date} ${hour} ${minute} [${label}] ${level}: ${message}`;
});
// Common options for both loggers
const commonOptions = {
    format: combine(label({ label: "ukil-saheb" }), timestamp(), myFormat, prettyPrint()),
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "15m",
    maxFiles: "7d",
};
const logger = (0, winston_1.createLogger)({
    level: "info",
    ...commonOptions,
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            ...commonOptions,
            filename: path_1.default.join(process.cwd(), "loggers", "winston", "successes", "realChat-%DATE%-success.log"),
        }),
    ],
});
exports.logger = logger;
const errorLogger = (0, winston_1.createLogger)({
    level: "error",
    ...commonOptions,
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            ...commonOptions,
            filename: path_1.default.join(process.cwd(), "loggers", "winston", "errors", "realChat-%DATE%-error.log"),
        }),
    ],
});
exports.errorLogger = errorLogger;
