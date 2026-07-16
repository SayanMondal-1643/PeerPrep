import { NextRequest } from "next/server";
import TopperBadgeApplication from "@/lib/models/TopperBadgeApplication";
import Material from "@/lib/models/Material";
import Topic from "@/lib/models/Topic";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { serializeTopperBadge } from "@/lib/api-helpers/serializeTopperBadge";

export const PATCH = catchAsync(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ applicationId: string }> },
  ) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { applicationId } = await params;
    const { status } = await req.json();

    if (!status) {
      throw new AppError("Status is required.", 400);
    }

    let application = await TopperBadgeApplication.findById(applicationId);

    if (!application) {
      throw new AppError("No application found with that ID.", 404);
    }

    const previousStatus = application.status;
    application.status = status;

    if (previousStatus !== status) {
      if (previousStatus !== "approved" && status === "approved") {
        const topics = await Topic.find(
          { subjectId: application.subjectId },
          { _id: 1 },
        );
        const topicIds = topics.map((topic) => topic._id);

        await Material.updateMany(
          { topicId: { $in: topicIds }, userId: application.userId },
          { isTopperMaterial: true },
        );
      } else if (
        previousStatus === "approved" &&
        (status === "pending" || status === "rejected")
      ) {
        const topics = await Topic.find(
          { subjectId: application.subjectId },
          { _id: 1 },
        );
        const topicIds = topics.map((topic) => topic._id);

        await Material.updateMany(
          { topicId: { $in: topicIds }, userId: application.userId },
          { isTopperMaterial: false },
        );
      }
    }

    await application.save();
    application = await application.populate("userId", "name");

    return success(serializeTopperBadge(application));
  },
);
