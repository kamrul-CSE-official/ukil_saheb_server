import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import lawyerControllers from "../controllers/lawyer.controllers";

const router = express.Router();


const routes = [
  { method: "GET", path: "/", controller: lawyerControllers.getAllLawyer },
  {
    method: "GET",
    path: "/best",
    controller: lawyerControllers.getBestLawyersController,
  },
  {
    method: "GET",
    path: "/totalNumber",
    controller: lawyerControllers.getTotalNumberOfLawyer,
  },
  { method: "GET", path: "/:_id", controller: lawyerControllers.getLawyerById },
  {
    method: "PATCH",
    path: "/:_id",
    controller: lawyerControllers.updateLawyerController,
  },
];

routes.forEach(({ method, path, controller }) => {
  switch (method) {
    case "GET":
      router.get(path, asyncHandler(controller));
      break;
    case "PATCH":
      router.patch(path, asyncHandler(controller));
      break;
    default:
      console.error(`Unsupported HTTP method: ${method}`);
  }
});

export default router;
