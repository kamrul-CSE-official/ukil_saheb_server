import { Schema, model, Document, Types } from "mongoose";

export interface IAppointment extends Document {
  user: Types.ObjectId;
  lawyer: Types.ObjectId;
  date: Date;
  time: Date;
  description?: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  userImg: string;
  userName: string;
  comment?: string;
  rating: number;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lawyer: { type: Schema.Types.ObjectId, ref: "Lawyer", required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
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
