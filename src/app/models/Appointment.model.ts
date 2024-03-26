import { Schema, model, Document, Types } from "mongoose";

export interface IAppointment extends Document {
  userId: Types.ObjectId;
  lawyerId: Types.ObjectId;
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
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lawyerId: { type: Schema.Types.ObjectId, ref: "Lawyer", required: true },
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
