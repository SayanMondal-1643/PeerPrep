import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExam extends Document {
  name: string;
}

const examSchema = new Schema<IExam>({
  name: { type: String, required: [true, "Exam name is required"], trim: true, unique: true },
});

examSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    delete ret.__v;
    return ret;
  },
});

const Exam: Model<IExam> = mongoose.models.Exam || mongoose.model<IExam>("Exam", examSchema);

export default Exam;
