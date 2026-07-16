import { NextRequest, NextResponse } from "next/server";
import Branch from "@/lib/models/Branch";
import Subject from "@/lib/models/Subject";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { resolveBreadcrumb } from "@/lib/api-helpers/breadcrumb";

export const GET = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ branchId: string }> }) => {
    const { branchId } = await params;

    const branch = await Branch.findById(branchId).select("name examId");
    if (!branch) {
      throw new AppError("No branch found with that ID.", 404);
    }

    const { exam } = await resolveBreadcrumb({ examId: String(branch.examId) });
    const subjects = await Subject.find({ branchId }).sort({ name: 1 });

    return NextResponse.json({
      status: "success",
      exam,
      branch: branch.name,
      results: subjects.length,
      data: subjects,
    });
  },
);

export const POST = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ branchId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { branchId } = await params;
    const { name } = await req.json();

    if (!name) {
      throw new AppError("Subject name is required.", 400);
    }

    const branch = await Branch.findById(branchId);
    if (!branch) {
      throw new AppError("No branch found with that ID.", 404);
    }

    const subject = await Subject.create({ name, branchId });

    return NextResponse.json(
      { status: "success", data: { _id: subject._id, name: subject.name } },
      { status: 201 },
    );
  },
);
