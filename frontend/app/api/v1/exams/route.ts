import { NextRequest } from "next/server";
import Exam from "@/lib/models/Exam";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireRole } from "@/lib/auth/guards";

export const GET = catchAsync(async () => {
  const exams = await Exam.find().sort({ name: 1 });
  return success(exams, { results: exams.length });
});

export const POST = catchAsync(async (req: NextRequest) => {
  const user = await requireAuth(req);
  requireRole(user, "admin");

  const { name } = await req.json();

  if (!name) {
    throw new AppError("Exam name is required.", 400);
  }

  const exam = await Exam.create({ name });
  return success(exam, { status: 201 });
});
