import { NextRequest } from "next/server";
import User from "@/lib/models/User";
import Material from "@/lib/models/Material";
import Comment from "@/lib/models/Comment";
import Rating from "@/lib/models/Rating";
import Report from "@/lib/models/Report";
import TopperBadgeApplication from "@/lib/models/TopperBadgeApplication";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { requireAuth } from "@/lib/auth/guards";

export const GET = catchAsync(async (req: NextRequest) => {
  const user = await requireAuth(req);
  return success(user.toJSON());
});

export const PATCH = catchAsync(async (req: NextRequest) => {
  const currentUser = await requireAuth(req);
  const body = await req.json();

  const allowedFields = ["name", "institutionName", "idProofUrl"] as const;
  const updates: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      updates[field] = body[field];
    }
  }

  const user = await User.findByIdAndUpdate(currentUser._id, updates, {
    new: true,
    runValidators: true,
  });

  return success(user!.toJSON());
});

export const DELETE = catchAsync(async (req: NextRequest) => {
  const currentUser = await requireAuth(req);
  const userId = currentUser._id;

  await Promise.all([
    User.findByIdAndDelete(userId),
    Material.deleteMany({ userId }),
    Comment.deleteMany({ userId }),
    Rating.deleteMany({ userId }),
    Report.deleteMany({ reporterId: userId }),
    TopperBadgeApplication.deleteMany({ userId }),
  ]);

  return success(null);
});
