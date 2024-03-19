import { Request, Response } from "express";
import ConnectWithUsServices from "../services/connectWithUs.services";

const getAllContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const connects = await ConnectWithUsServices.getAllContacts();

    res.status(200).json({
      status: "success",
      message: "Data retrieved successfully",
      data: connects,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve connects",
      error: error.message,
    });
  }
};

const getContactById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const connect = await ConnectWithUsServices.getConnectById(id);

    if (!connect) {
      res.status(404).json({
        status: "fail",
        message: "Connect not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Connect with us retrieved successfully",
      data: connect,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve connect",
      error: error.message,
    });
  }
};

const connectWithUsControllers = {
  getAllContacts,
  getContactById,
};
export default connectWithUsControllers;
