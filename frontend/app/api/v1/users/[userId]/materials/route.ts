import { NextRequest } from "next/server";
import User from "@/lib/models/User";
import Material from "@/lib/models/Material";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth } from "@/lib/auth/guards";
import { USER_REF_SELECT } from "@/lib/api-helpers/populateUser";

export const GET = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ userId: string }> }) => {
    await requireAuth(req);

    const { userId } = await params;
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("No user found with that ID.", 404);
    }

    const materials = await Material.find({ userId })
      .populate("userId", USER_REF_SELECT)
      .sort({ uploadDate: -1 });

    return success(materials, { results: materials.length });
  },
);
