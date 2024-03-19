import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

import authRouters from "./app/routers/auth.routers";
import appointmentRouters from "./app/routers/appointment.routers";
import lawyerRouters from "./app/routers/lawyer.routers";
import connectWithUsRouters from "./app/routers/ConnectWithUs.routers";
import usersRouters from "./app/routers/user.routers";

const app = express();

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Sorry, you have exceeded the request limit. Please try again later after some time.",
});

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1", (req, res) => {
  res.send("Ukil Saheb ⚖️");
});

// Routers setup
app.use("/api/v1/auth", limiter, authRouters);
app.use("/api/v1/users", usersRouters);
app.use("/api/v1/lawyers", lawyerRouters);
app.use("/api/v1/connect", connectWithUsRouters);
app.use("/api/v1/appointments", appointmentRouters);

// Error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Requested URL:", req.url);
  next("Requested URL was not found!");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.message) {
    res.status(500).json({ status: "fail", message: err.message });
  } else {
    next(err);
  }
});

export default app;
