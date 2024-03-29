import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import generalUsersControllers from "../controllers/user.controllers";

const router = express.Router();

// Define routes and corresponding controller functions
const routes = [
  {
    method: "GET",
    path: "/",
    controller: generalUsersControllers.getAllGeneralUsers,
  },
  {
    method: "GET",
    path: "/:_id",
    controller: generalUsersControllers.getGeneralUserById,
  },
];

// Map routes to controller functions
routes.forEach(({ method, path, controller }) => {
  switch (method) {
    case "GET":
      router.get(path, asyncHandler(controller));
      break;
    default:
      console.error(`Unsupported HTTP method: ${method}`);
  }
});

export default router;
