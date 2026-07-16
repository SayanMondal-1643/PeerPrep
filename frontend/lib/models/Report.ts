import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IReport extends Document {
  materialId: Types.ObjectId;
  reporterId: Types.ObjectId;
  reportReason: string;
  comment?: string;
  reportDate: Date;
  status: "pending" | "resolved" | "rejected";
}

const reportSchema = new Schema<IReport>({
  materialId: { type: Schema.Types.ObjectId, ref: "Material", required: true, index: true },
  reporterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reportReason: { type: String, required: [true, "Report reason is required"] },
  comment: { type: String },
  reportDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "resolved", "rejected"],
    default: "pending",
  },
});

const Report: Model<IReport> = mongoose.models.Report || mongoose.model<IReport>("Report", reportSchema);

export default Report;
