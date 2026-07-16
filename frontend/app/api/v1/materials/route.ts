import { NextRequest } from "next/server";
import Material from "@/lib/models/Material";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { USER_REF_SELECT } from "@/lib/api-helpers/populateUser";

export const GET = catchAsync(async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 0);

  let query = Material.find()
    .populate("userId", USER_REF_SELECT)
    .sort({ uploadDate: -1 });

  if (limit > 0) {
    query = query.skip((page - 1) * limit).limit(limit);
  }

  const materials = await query;

  return success(materials, { results: materials.length });
});
