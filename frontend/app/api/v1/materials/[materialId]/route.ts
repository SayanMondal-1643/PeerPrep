import { NextRequest } from "next/server";
import Material from "@/lib/models/Material";
import Rating from "@/lib/models/Rating";
import Comment from "@/lib/models/Comment";
import Report from "@/lib/models/Report";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireOwnerOrAdmin } from "@/lib/auth/guards";
import { USER_REF_SELECT } from "@/lib/api-helpers/populateUser";

export const GET = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ materialId: string }> }) => {
    const { materialId } = await params;

    const material = await Material.findById(materialId).populate("userId", USER_REF_SELECT);

    if (!material) {
      throw new AppError("No material found with that ID.", 404);
    }

    return success(material);
  },
);

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ materialId: string }> }) => {
    const user = await requireAuth(req);

    const { materialId } = await params;
    const body = await req.json();

    const material = await Material.findById(materialId);
    if (!material) {
      throw new AppError("No material found with that ID.", 404);
    }

    const allowedFields =
      user.role === "admin"
        ? (["title", "description", "status", "isBestMaterial", "isTopperMaterial", "isAIPicked"] as const)
        : (["title", "description"] as const);

    if (user.role !== "admin") {
      requireOwnerOrAdmin(user, String(material.userId));
    }

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        (material as unknown as Record<string, unknown>)[field] = body[field];
      }
    }

    await material.save();
    await material.populate("userId", USER_REF_SELECT);

    return success(material);
  },
);

export const DELETE = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ materialId: string }> }) => {
    const user = await requireAuth(req);

    const { materialId } = await params;
    const material = await Material.findById(materialId);

    if (!material) {
      throw new AppError("No material found with that ID.", 404);
    }

    requireOwnerOrAdmin(user, String(material.userId));

    await Promise.all([
      Rating.deleteMany({ materialId }),
      Comment.deleteMany({ materialId }),
      Report.deleteMany({ materialId }),
    ]);
    await Material.findByIdAndDelete(materialId);

    return success(null);
  },
);
