import { NextRequest } from "next/server";
import Topic from "@/lib/models/Topic";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { deleteTopicCascade } from "@/lib/api-helpers/cascade";

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ topicId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { topicId } = await params;
    const { name } = await req.json();

    if (!name) {
      throw new AppError("Topic name is required.", 400);
    }

    const topic = await Topic.findByIdAndUpdate(
      topicId,
      { name },
      { new: true, runValidators: true },
    ).select("_id name");

    if (!topic) {
      throw new AppError("No topic found with that ID.", 404);
    }

    return success({ _id: topic._id, name: topic.name });
  },
);

export const DELETE = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ topicId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { topicId } = await params;
    const topic = await Topic.findById(topicId);

    if (!topic) {
      throw new AppError("No topic found with that ID.", 404);
    }

    await deleteTopicCascade(topicId);

    return success(null);
  },
);
