import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IMaterial extends Document {
  title: string;
  description: string;
  fileUrl: string;
  uploadDate: Date;
  status: "pending" | "approved" | "rejected";
  userId: Types.ObjectId;
  topicId: Types.ObjectId;
  isBestMaterial: boolean;
  isTopperMaterial: boolean;
  isAIPicked: boolean;
  ratingsAverage: number;
  ratingsQuantity: number;
}

const materialSchema = new Schema<IMaterial>({
  title: { type: String, required: [true, "Title is required"], trim: true },
  description: { type: String, required: [true, "Description is required"] },
  fileUrl: { type: String, required: [true, "File URL is required"] },
  uploadDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true, index: true },
  isBestMaterial: { type: Boolean, default: false },
  isTopperMaterial: { type: Boolean, default: false },
  isAIPicked: { type: Boolean, default: false },
  ratingsAverage: { type: Number, default: 0, min: 0, max: 5 },
  ratingsQuantity: { type: Number, default: 0 },
});

materialSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    if (ret.uploadDate instanceof Date) {
      ret.uploadDate = ret.uploadDate.toISOString().slice(0, 10);
    }
    delete ret.__v;
    return ret;
  },
});

const Material: Model<IMaterial> =
  mongoose.models.Material || mongoose.model<IMaterial>("Material", materialSchema);

export default Material;
