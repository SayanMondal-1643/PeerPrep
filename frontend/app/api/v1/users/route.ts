import { NextRequest } from "next/server";
import User from "@/lib/models/User";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { requireAuth, requireRole } from "@/lib/auth/guards";

export const GET = catchAsync(async (req: NextRequest) => {
  const currentUser = await requireAuth(req);
  requireRole(currentUser, "admin");

  const users = await User.find().sort({ createdAt: -1 });

  return success(
    users.map((u) => u.toJSON()),
    { results: users.length },
  );
});
