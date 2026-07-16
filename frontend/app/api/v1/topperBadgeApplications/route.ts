import { NextRequest } from "next/server";
import TopperBadgeApplication from "@/lib/models/TopperBadgeApplication";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { serializeTopperBadge } from "@/lib/api-helpers/serializeTopperBadge";

export const GET = catchAsync(async (req: NextRequest) => {
  const user = await requireAuth(req);
  requireRole(user, "admin");

  const applications = await TopperBadgeApplication.find().populate("userId", "name");

  return success(applications.map(serializeTopperBadge), { results: applications.length });
});
