import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ITopperBadgeApplication extends Document {
  userId: Types.ObjectId;
  exam: string;
  branch: string;
  subject: string;
  year: number;
  cgpa: number;
  markSheetUrl: string;
  status: "pending" | "approved" | "rejected";
}

const topperBadgeApplicationSchema = new Schema<ITopperBadgeApplication>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  exam: { type: String, required: [true, "Exam is required"] },
  branch: { type: String, required: [true, "Branch is required"] },
  subject: { type: String, required: [true, "Subject is required"] },
  year: { type: Number, required: [true, "Year is required"] },
  cgpa: { type: Number, required: [true, "CGPA is required"] },
  markSheetUrl: { type: String, required: [true, "Mark sheet URL is required"] },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const TopperBadgeApplication: Model<ITopperBadgeApplication> =
  mongoose.models.TopperBadgeApplication ||
  mongoose.model<ITopperBadgeApplication>("TopperBadgeApplication", topperBadgeApplicationSchema);

export default TopperBadgeApplication;
