import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { authControllers } from "../controllers/auth.controllers";

const router = express.Router();

// Define routes and corresponding controller functions
const routes = [
  {
    method: "POST",
    path: "/register",
    controller: authControllers.registerGeneralController,
  },
  {
    method: "POST",
    path: "/register/lawyer",
    controller: authControllers.registerLawyerController,
  },
  {
    method: "POST",
    path: "/login",
    controller: authControllers.loginController,
  },
  {
    method: "POST",
    path: "/logout",
    controller: authControllers.logoutController,
  },
];

// Map routes to controller functions
routes.forEach(({ method, path, controller }) => {
  switch (method) {
    case "POST":
      router.post(path, asyncHandler(controller));
      break;
    default:
      console.error(`Unsupported HTTP method: ${method}`);
  }
});

export default router;
