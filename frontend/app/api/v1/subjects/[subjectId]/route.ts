import { NextRequest } from "next/server";
import Subject from "@/lib/models/Subject";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { deleteSubjectCascade } from "@/lib/api-helpers/cascade";

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ subjectId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { subjectId } = await params;
    const { name } = await req.json();

    if (!name) {
      throw new AppError("Subject name is required.", 400);
    }

    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      { name },
      { new: true, runValidators: true },
    ).select("_id name");

    if (!subject) {
      throw new AppError("No subject found with that ID.", 404);
    }

    return success({ _id: subject._id, name: subject.name });
  },
);

export const DELETE = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ subjectId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { subjectId } = await params;
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      throw new AppError("No subject found with that ID.", 404);
    }

    await deleteSubjectCascade(subjectId);

    return success(null);
  },
);
