import { NextRequest, NextResponse } from "next/server";
import Report from "@/lib/models/Report";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { serializeReport } from "@/lib/api-helpers/serializeReport";
import { USER_REF_SELECT } from "@/lib/api-helpers/populateUser";

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ reportId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { reportId } = await params;
    const { status } = await req.json();

    if (!status) {
      throw new AppError("Status is required.", 400);
    }

    let report = await Report.findByIdAndUpdate(reportId, { status }, { new: true, runValidators: true });

    if (!report) {
      throw new AppError("No report found with that ID.", 404);
    }

    report = await report.populate([
      { path: "materialId", select: "title fileUrl" },
      { path: "reporterId", select: USER_REF_SELECT },
    ]);

    return NextResponse.json({
      status: "success",
      message: "Status updated successfully",
      data: serializeReport(report),
    });
  },
);
