import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IComment extends Document {
  materialId: Types.ObjectId;
  comment: string;
  userId: Types.ObjectId;
  createdAt: Date;
}

const commentSchema = new Schema<IComment>({
  materialId: { type: Schema.Types.ObjectId, ref: "Material", required: true, index: true },
  comment: { type: String, required: [true, "Comment text is required"] },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

commentSchema.set("toJSON", {
  transform: (_doc, ret: any) => {
    if (ret.createdAt instanceof Date) {
      ret.createdAt = ret.createdAt.toISOString().slice(0, 10);
    }
    delete ret.__v;
    return ret;
  },
});

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
