import { NextRequest, NextResponse } from "next/server";
import Material from "@/lib/models/Material";
import Report from "@/lib/models/Report";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth } from "@/lib/auth/guards";
import { serializeReport } from "@/lib/api-helpers/serializeReport";
import { USER_REF_SELECT } from "@/lib/api-helpers/populateUser";

export const POST = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ materialId: string }> }) => {
    const user = await requireAuth(req);

    const { materialId } = await params;
    const { reportReason, comment } = await req.json();

    if (!reportReason) {
      throw new AppError("Report reason is required.", 400);
    }

    const material = await Material.findById(materialId);
    if (!material) {
      throw new AppError("No material found with that ID.", 404);
    }

    let report = await Report.create({
      materialId,
      reporterId: user._id,
      reportReason,
      comment,
    });

    report = await report.populate([
      { path: "materialId", select: "title fileUrl" },
      { path: "reporterId", select: USER_REF_SELECT },
    ]);

    return NextResponse.json(
      {
        status: "success",
        message: "Report submitted successfully",
        data: serializeReport(report),
      },
      { status: 201 },
    );
  },
);
