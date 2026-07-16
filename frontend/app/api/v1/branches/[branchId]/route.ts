import { NextRequest } from "next/server";
import Branch from "@/lib/models/Branch";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth, requireRole } from "@/lib/auth/guards";
import { deleteBranchCascade } from "@/lib/api-helpers/cascade";

export const PATCH = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ branchId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { branchId } = await params;
    const { name } = await req.json();

    if (!name) {
      throw new AppError("Branch name is required.", 400);
    }

    const branch = await Branch.findByIdAndUpdate(
      branchId,
      { name },
      { new: true, runValidators: true },
    ).select("_id name");

    if (!branch) {
      throw new AppError("No branch found with that ID.", 404);
    }

    return success({ _id: branch._id, name: branch.name });
  },
);

export const DELETE = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ branchId: string }> }) => {
    const user = await requireAuth(req);
    requireRole(user, "admin");

    const { branchId } = await params;
    const branch = await Branch.findById(branchId);

    if (!branch) {
      throw new AppError("No branch found with that ID.", 404);
    }

    await deleteBranchCascade(branchId);

    return success(null);
  },
);
