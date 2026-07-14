import mongoose, { Schema, Document, Model, Types } from "mongoose";
import Material from "./Material";

export interface IRating extends Document {
  materialId: Types.ObjectId;
  userId: Types.ObjectId;
  ratingValue: number;
}

const ratingSchema = new Schema<IRating>({
  materialId: { type: Schema.Types.ObjectId, ref: "Material", required: true, index: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  ratingValue: { type: Number, required: true, min: 1, max: 5 },
});

ratingSchema.index({ materialId: 1, userId: 1 }, { unique: true });

ratingSchema.statics.calcAverageRatings = async function (materialId: Types.ObjectId) {
  const stats = await this.aggregate([
    { $match: { materialId } },
    {
      $group: {
        _id: "$materialId",
        ratingsQuantity: { $sum: 1 },
        ratingsAverage: { $avg: "$ratingValue" },
      },
    },
  ]);

  if (stats.length > 0) {
    await Material.findByIdAndUpdate(materialId, {
      ratingsQuantity: stats[0].ratingsQuantity,
      ratingsAverage: Math.round(stats[0].ratingsAverage * 10) / 10,
    });
  } else {
    await Material.findByIdAndUpdate(materialId, {
      ratingsQuantity: 0,
      ratingsAverage: 0,
    });
  }
};

ratingSchema.post("save", function () {
  (this.constructor as typeof Rating).calcAverageRatings(this.materialId);
});

interface RatingModel extends Model<IRating> {
  calcAverageRatings(materialId: Types.ObjectId): Promise<void>;
}

const Rating = (mongoose.models.Rating ||
  mongoose.model<IRating, RatingModel>("Rating", ratingSchema)) as RatingModel;

export default Rating;
