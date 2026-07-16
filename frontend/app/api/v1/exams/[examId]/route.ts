import { NextRequest } from "next/server";
import Exam from "@/lib/models/Exam";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { deleteExamCascade } from "@/lib/api-helpers/cascade";

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ examId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { examId } = await params;
    const { name } = await req.json();

    if (!name) {
      throw new AppError("Exam name is required.", 400);
    }

    const exam = await Exam.findByIdAndUpdate(examId, { name }, { new: true, runValidators: true });

    if (!exam) {
      throw new AppError("No exam found with that ID.", 404);
    }

    return success(exam);
  },
);

export const DELETE = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ examId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { examId } = await params;
    const exam = await Exam.findById(examId);

    if (!exam) {
      throw new AppError("No exam found with that ID.", 404);
    }

    await deleteExamCascade(examId);
    await Exam.findByIdAndDelete(examId);

    return success(null);
  },
);
