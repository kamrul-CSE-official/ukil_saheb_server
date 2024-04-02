import { Schema, model, Document } from "mongoose";

export interface IAppointment extends Document {
  userId: string;
  lawyerId: string;
  lawyerName: string;
  date: string;
  time: string;
  description?: string;
  status?: "Pending" | "Confirmed" | "Cancelled";
  userImg: string;
  userName: string;
  comment?: string;
  rating?: number;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    userId: { type: String, required: true },
    lawyerId: { type: String, required: true },
    lawyerName: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    userImg: { type: String, required: true },
    userName: { type: String, required: true },
    comment: { type: String },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Appointment = model<IAppointment>("Appointment", appointmentSchema);

export default Appointment;
