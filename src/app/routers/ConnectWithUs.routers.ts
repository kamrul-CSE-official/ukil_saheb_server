import express from "express";
import asyncHandler from "../middlewares/asyncHandler";
import connectWithusControllers from "../controllers/connectWithUs.controllers";

const router = express.Router();

const routes = [
  { path: "/", controller: connectWithusControllers.getAllContacts },
  { path: "/:id", controller: connectWithusControllers.getContactById },
];

// Apply asyncHandler middleware to each route
routes.forEach(({ path, controller }) => {
  router.post(path, asyncHandler(controller));
});

export default router;
