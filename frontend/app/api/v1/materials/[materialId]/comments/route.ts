import { NextRequest } from "next/server";
import Material from "@/lib/models/Material";
import Comment from "@/lib/models/Comment";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth } from "@/lib/auth/guards";
import { USER_REF_SELECT } from "@/lib/api-helpers/populateUser";

export const GET = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ materialId: string }> }) => {
    const { materialId } = await params;

    const comments = await Comment.find({ materialId })
      .populate("userId", USER_REF_SELECT)
      .sort({ createdAt: -1 });

    return success(comments, { results: comments.length });
  },
);

export const POST = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ materialId: string }> }) => {
    const user = await requireAuth(req);

    const { materialId } = await params;
    const { comment: commentText } = await req.json();

    if (!commentText) {
      throw new AppError("Comment text is required.", 400);
    }

    const material = await Material.findById(materialId);
    if (!material) {
      throw new AppError("No material found with that ID.", 404);
    }

    let comment = await Comment.create({ materialId, comment: commentText, userId: user._id });
    comment = await comment.populate("userId", USER_REF_SELECT);

    return success(comment, { status: 201 });
  },
);
