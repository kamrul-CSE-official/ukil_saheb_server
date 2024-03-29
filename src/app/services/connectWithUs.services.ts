import ConnectWithUs from "../models/connectWith.model";
import { IConnect } from "../models/connectWith.model";

const getAllContacts = async (): Promise<any> => {
  try {
    const connects = await ConnectWithUs.find();
    return connects;
  } catch (error) {
    throw new Error("Failed to retrieve connects");
  }
};

const getConnectById = async (id: string): Promise<any | null> => {
  try {
    console.log(id);
    const query = { $or: [{ receiverId: id }, { senderId: id }] };
    const connects = await ConnectWithUs.find(query);
    return connects;
  } catch (error) {
    throw new Error("Failed to retrieve connect");
  }
};

const createConnectWithUs = async (data: IConnect): Promise<any | null> => {
  try {
    const query = new ConnectWithUs(data);
    const result = await query.save();
    return result;
  } catch (error) {
    throw new Error("Failed to create connect");
  }
};

const updateConnectWithUs = async (
  id: string,
  data: IConnect
): Promise<any | null> => {
  try {
    const result = await ConnectWithUs.findByIdAndUpdate(id, data, {
      new: true,
    });
    return result;
  } catch (error) {
    throw new Error("Failed to update connect");
  }
};

const deleteConnectWithUs = async (id: string): Promise<any | null> => {
  try {
    const result = await ConnectWithUs.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new Error("Failed to delete connect");
  }
};

const ConnectWithUsServices = {
  getAllContacts,
  getConnectById,
  createConnectWithUs,
  updateConnectWithUs,
  deleteConnectWithUs,
};

export default ConnectWithUsServices;
