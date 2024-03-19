import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import lawyerControllers from "../controllers/lawyer.controllers";

const router = express.Router();

// Define routes and corresponding controller functions
const routes = [
  { path: "/", controller: lawyerControllers.getAllLawyer },
  { path: "/:id", controller: lawyerControllers.getLawyerById },
  { path: "/best", controller: lawyerControllers.getBestLawyersController },
];

// Apply asyncHandler middleware to each route
routes.forEach(({ path, controller }) => {
  router.post(path, asyncHandler(controller));
});

export default router;
