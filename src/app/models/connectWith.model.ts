import { Schema, model } from "mongoose";

export interface IConnect {
  _id: string;
  senderId: string;
  receiverId: string;
  img: string;
  name: string;
  date: string;
  message: string;
  senderEmail: string;
  senderMobile: string;
  receiverName: string;
}

const connectWithUsSchema = new Schema(
  {
    senderId: { type: String, default: "" },
    senderEmail: { type: String, required: true },
    senderMobile: { type: String, required: true },
    receiverName: { type: String, required: true },
    receiverId: { type: String, default: "Admin" },
    img: { type: String, default: "https://avatar.iran.liara.run/public/boy" },
    name: { type: String, default: "" },
    date: {
      type: String,
      default: `${new Date().getHours()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`,
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const CommectWithUs = model<IConnect>("ConnectWithUs", connectWithUsSchema);

export default CommectWithUs;
