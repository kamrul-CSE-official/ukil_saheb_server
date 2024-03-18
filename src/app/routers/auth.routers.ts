import express from "express";
import { authControllers } from "../controllers/auth.controllers";

import asyncHandler from "../middlewares/asyncHandler";

const router = express.Router();

// Define routes and corresponding controller functions
const routes = [
  { path: "/register", controller: authControllers.registerGeneralController },
  {
    path: "/register/lawyer",
    controller: authControllers.registerLawyerController,
  },
  { path: "/login", controller: authControllers.loginController },
  { path: "/logout", controller: authControllers.logoutController },
];

// Apply asyncHandler middleware to each route
routes.forEach(({ path, controller }) => {
  router.post(path, asyncHandler(controller));
});

export default router;
