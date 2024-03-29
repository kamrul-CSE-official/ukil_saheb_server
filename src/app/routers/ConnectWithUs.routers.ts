import express from "express";
import connectWithUsControllers from "../controllers/connectWithUs.controllers";
import asyncHandler from "../middlewares/asyncHandler";

const router = express.Router();

// Define routes and corresponding controller functions
const routes = [
  {
    method: "GET",
    path: "/",
    controller: connectWithUsControllers.getAllContacts,
  },
  {
    method: "GET",
    path: "/:_id",
    controller: connectWithUsControllers.getContactById,
  },
  {
    method: "POST",
    path: "/",
    controller: connectWithUsControllers.createContact,
  },
  {
    method: "DELETE",
    path: "/:_id",
    controller: connectWithUsControllers.deleteContactById,
  },
  {
    method: "PATCH",
    path: "/:_id",
    controller: connectWithUsControllers.updateContactById,
  },
];

// Map routes to controller functions
routes.forEach(({ method, path, controller }) => {
  switch (method) {
    case "GET":
      router.get(path, asyncHandler(controller));
      break;
    case "POST":
      router.post(path, asyncHandler(controller));
      break;
    case "DELETE":
      router.delete(path, asyncHandler(controller));
      break;
    case "PATCH":
      router.patch(path, asyncHandler(controller));
      break;
    default:
      console.error(`Unsupported HTTP method: ${method}`);
  }
});

export default router;
