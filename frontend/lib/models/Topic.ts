import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ITopic extends Document {
  name: string;
  subjectId: Types.ObjectId;
}

const topicSchema = new Schema<ITopic>({
  name: { type: String, required: [true, "Topic name is required"], trim: true },
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true, index: true },
});

topicSchema.index({ subjectId: 1, name: 1 }, { unique: true });

const Topic: Model<ITopic> = mongoose.models.Topic || mongoose.model<ITopic>("Topic", topicSchema);

export default Topic;
