import { NextRequest } from "next/server";
import Comment from "@/lib/models/Comment";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireOwnerOrAdmin } from "@/lib/auth/guards";
import { USER_REF_SELECT } from "@/lib/api-helpers/populateUser";

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ commentId: string }> }) => {
    const user = await requireAuth(req);

    const { commentId } = await params;
    const { comment: commentText } = await req.json();

    if (!commentText) {
      throw new AppError("Comment text is required.", 400);
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new AppError("No comment found with that ID.", 404);
    }

    requireOwnerOrAdmin(user, String(comment.userId));

    comment.comment = commentText;
    await comment.save();
    await comment.populate("userId", USER_REF_SELECT);

    return success(comment);
  },
);

export const DELETE = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ commentId: string }> }) => {
    const user = await requireAuth(req);

    const { commentId } = await params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw new AppError("No comment found with that ID.", 404);
    }

    requireOwnerOrAdmin(user, String(comment.userId));

    await Comment.findByIdAndDelete(commentId);

    return success(null);
  },
);
