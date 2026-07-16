import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ISubject extends Document {
  name: string;
  branchId: Types.ObjectId;
}

const subjectSchema = new Schema<ISubject>({
  name: { type: String, required: [true, "Subject name is required"], trim: true },
  branchId: { type: Schema.Types.ObjectId, ref: "Branch", required: true, index: true },
});

subjectSchema.index({ branchId: 1, name: 1 }, { unique: true });

const Subject: Model<ISubject> = mongoose.models.Subject || mongoose.model<ISubject>("Subject", subjectSchema);

export default Subject;
