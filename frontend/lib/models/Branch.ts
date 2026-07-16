import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IBranch extends Document {
  name: string;
  examId: Types.ObjectId;
}

const branchSchema = new Schema<IBranch>({
  name: { type: String, required: [true, "Branch name is required"], trim: true },
  examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true, index: true },
});

branchSchema.index({ examId: 1, name: 1 }, { unique: true });

const Branch: Model<IBranch> = mongoose.models.Branch || mongoose.model<IBranch>("Branch", branchSchema);

export default Branch;
