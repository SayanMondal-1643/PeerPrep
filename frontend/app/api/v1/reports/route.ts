import { NextRequest } from "next/server";
import Report from "@/lib/models/Report";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { serializeReport } from "@/lib/api-helpers/serializeReport";
import { USER_REF_SELECT } from "@/lib/api-helpers/populateUser";

export const GET = catchAsync(async (req: NextRequest) => {
  const user = await requireAuth(req);
  requireRole(user, "admin");

  const reports = await Report.find()
    .populate("materialId", "title")
    .populate("reporterId", USER_REF_SELECT)
    .sort({ reportDate: -1 });

  return success(reports.map(serializeReport), { results: reports.length });
});
