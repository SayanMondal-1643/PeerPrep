import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import TopperBadgeApplication from "@/lib/models/TopperBadgeApplication";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireOwnerOrAdmin } from "@/lib/auth/guards";
import { serializeTopperBadge } from "@/lib/api-helpers/serializeTopperBadge";

export const GET = catchAsync(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }> },
  ) => {
    await requireAuth(req);

    const { userId } = await params;
    const applications = await TopperBadgeApplication.find({ userId }).populate(
      "userId",
      "name",
    );

    return success(applications.map(serializeTopperBadge), {
      results: applications.length,
    });
  },
);

export const POST = catchAsync(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }> },
  ) => {
    const currentUser = await requireAuth(req);

    const { userId } = await params;
    requireOwnerOrAdmin(currentUser, userId);

    const { exam, branch, subject, subjectId, year, cgpa, markSheetUrl } =
      await req.json();

    if (!subjectId) {
      throw new AppError("subjectId is required.", 400);
    }

    if (
      !exam ||
      !branch ||
      !subject ||
      !year ||
      cgpa === undefined ||
      !markSheetUrl
    ) {
      throw new AppError(
        "exam, branch, subject, year, cgpa, and markSheetUrl are required.",
        400,
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError("No user found with that ID.", 404);
    }

    let application = await TopperBadgeApplication.create({
      userId,
      subjectId,
      exam,
      branch,
      subject,
      year,
      cgpa,
      markSheetUrl,
    });

    application = await application.populate("userId", "name");

    return NextResponse.json(
      {
        status: "success",
        message: "Application submitted successfully",
        data: serializeTopperBadge(application),
      },
      { status: 201 },
    );
  },
);
