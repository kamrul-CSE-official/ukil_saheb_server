import { Request, Response } from "express";
import userServices from "../services/user.services";

const getAllGeneralUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const generalPeople = await userServices.getAllGeneralusers();

    res.status(200).json({
      status: "success",
      message: "Data retrieved successfully",
      data: generalPeople,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve general people",
      error: error.message,
    });
  }
};

const getGeneralUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id } = req.params;
    const generalPeople = await userServices.getGeneralUserById(_id);

    if (!generalPeople) {
      res.status(404).json({
        status: "fail",
        message: "Lawyer not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "general people retrieved successfully",
      data: generalPeople,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve general people",
      error: error.message,
    });
  }
};

const generalUsersControllers = {
  getAllGeneralUsers,
  getGeneralUserById,
};
export default generalUsersControllers;
