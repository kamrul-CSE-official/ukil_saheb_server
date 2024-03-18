import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const { combine, timestamp, label, printf, prettyPrint } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${date} ${hour} ${minute} [${label}] ${level}: ${message}`;
});

// Common options for both loggers
const commonOptions = {
  format: combine(
    label({ label: "ukil-saheb" }),
    timestamp(),
    myFormat,
    prettyPrint()
  ),
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "15m",
  maxFiles: "7d",
};

const logger = createLogger({
  level: "info",
  ...commonOptions,
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      ...commonOptions,
      filename: path.join(
        process.cwd(),
        "loggers",
        "winston",
        "successes",
        "realChat-%DATE%-success.log"
      ),
    }),
  ],
});

const errorLogger = createLogger({
  level: "error",
  ...commonOptions,
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      ...commonOptions,
      filename: path.join(
        process.cwd(),
        "loggers",
        "winston",
        "errors",
        "realChat-%DATE%-error.log"
      ),
    }),
  ],
});

export { logger, errorLogger };
