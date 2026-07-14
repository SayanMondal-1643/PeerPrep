import { NextRequest } from "next/server";
import User from "@/lib/models/User";
import Material from "@/lib/models/Material";
import Comment from "@/lib/models/Comment";
import Rating from "@/lib/models/Rating";
import Report from "@/lib/models/Report";
import TopperBadgeApplication from "@/lib/models/TopperBadgeApplication";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireRole } from "@/lib/auth/guards";

export const GET = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ userId: string }> }) => {
    await requireAuth(req);

    const { userId } = await params;
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("No user found with that ID.", 404);
    }

    return success(user.toJSON());
  },
);

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ userId: string }> }) => {
    const currentUser = await requireAuth(req);
    requireRole(currentUser, "admin");

    const { userId } = await params;
    const body = await req.json();

    const allowedFields = ["accountStatus", "verificationStatus", "role"] as const;
    const updates: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

    if (!user) {
      throw new AppError("No user found with that ID.", 404);
    }

    return success(user.toJSON());
  },
);

export const DELETE = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ userId: string }> }) => {
    const currentUser = await requireAuth(req);
    requireRole(currentUser, "admin");

    const { userId } = await params;
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("No user found with that ID.", 404);
    }

    await Promise.all([
      User.findByIdAndDelete(userId),
      Material.deleteMany({ userId }),
      Comment.deleteMany({ userId }),
      Rating.deleteMany({ userId }),
      Report.deleteMany({ reporterId: userId }),
      TopperBadgeApplication.deleteMany({ userId }),
    ]);

    return success(null);
  },
);
