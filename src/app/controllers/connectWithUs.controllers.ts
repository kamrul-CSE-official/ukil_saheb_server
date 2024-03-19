import { NextFunction, Request, Response } from "express";
import ConnectWithUsServices from "../services/connectWithUs.services";

const getAllContacts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contacts = await ConnectWithUsServices.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const contact = await ConnectWithUsServices.getConnectById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const newContact = await ConnectWithUsServices.createConnectWithUs(data);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedContact = await ConnectWithUsServices.updateConnectWithUs(
      id,
      data
    );
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const deletedContact = await ConnectWithUsServices.deleteConnectWithUs(id);
    res.status(200).json(deletedContact);
  } catch (error) {
    next(error);
  }
};

const connectWithUsControllers = {
  getAllContacts,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
};

export default connectWithUsControllers;
