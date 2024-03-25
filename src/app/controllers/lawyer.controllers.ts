import { Request, Response } from "express";
import lawyerServices from "../services/lawyer.services";

const getAllLawyer = async (req: Request, res: Response): Promise<void> => {
  try {
    const page: number = parseInt(req.query.page as string);
    const limit: number = parseInt(req.query.limit as string);
    const gender = req.query.gender as string;
    const occupation = req.query.occupation as string;

    const lawyers = await lawyerServices.getAllLawyers(
      page,
      limit,
      gender,
      occupation
    );

    res.status(200).json({
      status: "success",
      message: "Data retrieved successfully",
      data: lawyers,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve lawyers",
      error: error.message,
    });
  }
};

const getLawyerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = req.params;
    const lawyer = await lawyerServices.getLawyerById(_id);

    if (!lawyer) {
      res.status(404).json({
        status: "fail",
        message: "Lawyer not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Lawyer retrieved successfully",
      data: lawyer,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve lawyer",
      error: error.message,
    });
  }
};

const getBestLawyersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    const bestLawyers = await lawyerServices.getBestLawyers(page, limit);

    res.status(200).json({
      status: "success",
      message: "Data retrieved successfully",
      data: bestLawyers,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve best lawyers",
      error: error.message,
    });
  }
};

const getTotalNumberOfLawyer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalLawyers = await lawyerServices.totalNumberOfLawyers();
    res.status(200).json({
      status: "success",
      message: "Successfully get total number of lawyer",
      data: totalLawyers,
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve total number of lawyer.",
      error: error.message,
    });
  }
};

const lawyerControllers = {
  getAllLawyer,
  getBestLawyersController,
  getLawyerById,
  getTotalNumberOfLawyer,
};
export default lawyerControllers;
