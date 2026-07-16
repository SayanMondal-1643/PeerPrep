import { NextRequest } from "next/server";
import User from "@/lib/models/User";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { requireAuth } from "@/lib/auth/guards";
import { signToken } from "@/lib/auth/jwt";
import { setAuthCookie } from "@/lib/auth/cookies";

export const PATCH = catchAsync(async (req: NextRequest) => {
  const currentUser = await requireAuth(req);
  const { passwordCurrent, password } = await req.json();

  if (!passwordCurrent || !password) {
    throw new AppError("Please provide your current and new password.", 400);
  }

  const user = await User.findById(currentUser._id).select("+password");

  if (!user || !(await user.correctPassword(passwordCurrent))) {
    throw new AppError("Your current password is incorrect.", 401);
  }

  user.password = password;
  await user.save();

  const token = signToken(String(user._id));
  const response = success(user.toJSON());
  setAuthCookie(response, token);
  return response;
});
