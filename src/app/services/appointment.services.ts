import Appointment, { IAppointment } from "../models/Appointment.model";

const createAppointment = async (
  appointmentData: any
): Promise<IAppointment> => {
  const appointment: IAppointment = new Appointment(appointmentData);
  return await appointment.save();
};

const getAllAppointments = async (): Promise<IAppointment[]> => {
  return await Appointment.find();
};

const getAppointmentById = async (
  appointmentId: string
): Promise<IAppointment[] | null> => {
  try {
    const query = {
      $or: [{ userId: appointmentId }, { lawyerId: appointmentId }],
    };
    const appointment = await Appointment.find(query).exec();

    return appointment || null;
  } catch (error) {
    console.error(`Error fetching appointment by ID ${appointmentId}:`, error);
    throw new Error("Failed to fetch appointment");
  }
};

const updateAppointment = async (
  appointmentId: string,
  updateData: any
): Promise<IAppointment | null> => {
  console.log("Id: ", appointmentId, " UpdateD: ", updateData);
  const query = await Appointment.findByIdAndUpdate(appointmentId, updateData, {
    new: true,
  });
  console.log(query);
  return query;
};

const deleteAppointment = async (
  appointmentId: string
): Promise<IAppointment | null> => {
  return await Appointment.findByIdAndDelete(appointmentId);
};

const getRevew = async (lawyerId: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return await Appointment.find({ lawyerId: lawyerId }).skip(skip).limit(limit);
};

const totalNumberOfAppointment = async (id: string): Promise<number | null> => {
  try {
    const count = await Appointment.estimatedDocumentCount({ lawyerId: id });
    return count;
  } catch (error) {
    throw new Error("Failed to find total number of appointments");
  }
};

const appointmentServices = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getRevew,
  totalNumberOfAppointment,
};

export default appointmentServices;
