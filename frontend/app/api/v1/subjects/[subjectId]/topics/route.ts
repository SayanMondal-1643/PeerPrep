import { NextRequest, NextResponse } from "next/server";
import Subject from "@/lib/models/Subject";
import Topic from "@/lib/models/Topic";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { resolveBreadcrumb } from "@/lib/api-helpers/breadcrumb";

export const GET = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ subjectId: string }> }) => {
    const { subjectId } = await params;

    const subject = await Subject.findById(subjectId).select("name branchId");
    if (!subject) {
      throw new AppError("No subject found with that ID.", 404);
    }

    const { exam, branch } = await resolveBreadcrumb({ branchId: String(subject.branchId) });
    const topics = await Topic.find({ subjectId }).sort({ name: 1 });

    return NextResponse.json({
      status: "success",
      exam,
      branch,
      subject: subject.name,
      results: topics.length,
      data: topics,
    });
  },
);

export const POST = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ subjectId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { subjectId } = await params;
    const { name } = await req.json();

    if (!name) {
      throw new AppError("Topic name is required.", 400);
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      throw new AppError("No subject found with that ID.", 404);
    }

    const topic = await Topic.create({ name, subjectId });

    return NextResponse.json(
      { status: "success", data: { _id: topic._id, name: topic.name } },
      { status: 201 },
    );
  },
);
