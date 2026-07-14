import { NextRequest } from "next/server";
import TopperBadgeApplication from "@/lib/models/TopperBadgeApplication";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { serializeTopperBadge } from "@/lib/api-helpers/serializeTopperBadge";

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ applicationId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { applicationId } = await params;
    const { status } = await req.json();

    if (!status) {
      throw new AppError("Status is required.", 400);
    }

    let application = await TopperBadgeApplication.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true, runValidators: true },
    );

    if (!application) {
      throw new AppError("No application found with that ID.", 404);
    }

    application = await application.populate("userId", "name");

    return success(serializeTopperBadge(application));
  },
);
