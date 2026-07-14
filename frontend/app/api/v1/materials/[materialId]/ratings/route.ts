import { NextRequest, NextResponse } from "next/server";
import Material from "@/lib/models/Material";
import Rating from "@/lib/models/Rating";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth } from "@/lib/auth/guards";

export const POST = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ materialId: string }> }) => {
    const user = await requireAuth(req);

    const { materialId } = await params;
    const { ratingValue } = await req.json();

    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      throw new AppError("ratingValue must be between 1 and 5.", 400);
    }

    const material = await Material.findById(materialId);
    if (!material) {
      throw new AppError("No material found with that ID.", 404);
    }

    const rating = await Rating.findOneAndUpdate(
      { materialId, userId: user._id },
      { ratingValue },
      { new: true, upsert: true, runValidators: true },
    );

    await Rating.calcAverageRatings(material._id);
    const updatedMaterial = await Material.findById(materialId).select("ratingsAverage ratingsQuantity");

    return NextResponse.json({
      status: "success",
      data: {
        _id: rating._id,
        ratingValue: rating.ratingValue,
        ratingsAverage: updatedMaterial!.ratingsAverage,
        ratingsQuantity: updatedMaterial!.ratingsQuantity,
      },
    });
  },
);
