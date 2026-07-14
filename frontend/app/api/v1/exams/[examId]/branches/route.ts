import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Exam from "@/lib/models/Exam";
import Branch from "@/lib/models/Branch";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireRole } from "@/lib/auth/guards";

export const GET = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ examId: string }> }) => {
    const { examId } = await params;

    const exam = await Exam.findById(examId).select("name");

    if (!exam) {
      throw new AppError("No exam found with that ID.", 404);
    }

    const branches = await Branch.find({ examId }).sort({ name: 1 });

    return NextResponse.json({
      status: "success",
      exam: exam.name,
      results: branches.length,
      data: branches,
    });
  },
);

export const POST = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ examId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { examId } = await params;
    const { name } = await req.json();

    if (!name) {
      throw new AppError("Branch name is required.", 400);
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      throw new AppError("No exam found with that ID.", 404);
    }

    const branch = await Branch.create({ name, examId });

    return NextResponse.json(
      { status: "success", data: { _id: branch._id, name: branch.name } },
      { status: 201 },
    );
  },
);
