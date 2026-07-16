import { NextRequest, NextResponse } from "next/server";
import Topic from "@/lib/models/Topic";
import Material from "@/lib/models/Material";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth } from "@/lib/auth/guards";
import { resolveBreadcrumb } from "@/lib/api-helpers/breadcrumb";
import { USER_REF_SELECT } from "@/lib/api-helpers/populateUser";

export const GET = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ topicId: string }> }) => {
    const { topicId } = await params;

    const topic = await Topic.findById(topicId).select("name subjectId");
    if (!topic) {
      throw new AppError("No topic found with that ID.", 404);
    }

    const { exam, branch, subject } = await resolveBreadcrumb({ subjectId: String(topic.subjectId) });

    const materials = await Material.find({ topicId })
      .populate("userId", USER_REF_SELECT)
      .sort({ uploadDate: -1 });

    return NextResponse.json({
      status: "success",
      exam,
      branch,
      subject,
      topic: topic.name,
      results: materials.length,
      data: materials,
    });
  },
);

export const POST = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ topicId: string }> }) => {
    const user = await requireAuth(req);

    const { topicId } = await params;
    const { title, description, fileUrl } = await req.json();

    if (!title || !description || !fileUrl) {
      throw new AppError("Title, description, and fileUrl are required.", 400);
    }

    const topic = await Topic.findById(topicId);
    if (!topic) {
      throw new AppError("No topic found with that ID.", 404);
    }

    const material = await Material.create({
      title,
      description,
      fileUrl,
      topicId,
      userId: user._id,
    });

    await material.populate("userId", USER_REF_SELECT);

    return NextResponse.json({ status: "success", data: material }, { status: 201 });
  },
);
