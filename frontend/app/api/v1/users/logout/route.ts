import { NextResponse } from "next/server";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { clearAuthCookie } from "@/lib/auth/cookies";

export const POST = catchAsync(async () => {
  const response = NextResponse.json({ status: "success" }, { status: 200 });
  clearAuthCookie(response);
  return response;
});
