import { NextRequest } from "next/server";
import User from "@/lib/models/User";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { signToken } from "@/lib/auth/jwt";
import { setAuthCookie } from "@/lib/auth/cookies";

export const POST = catchAsync(async (req: NextRequest) => {
  const { email, password } = await req.json();

  if (!email || !password) {
    throw new AppError("Please provide email and password.", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password))) {
    throw new AppError("Incorrect email or password.", 401);
  }

  if (user.accountStatus === "suspended") {
    throw new AppError("Your account has been suspended.", 403);
  }

  const token = signToken(String(user._id));
  const response = success(user.toJSON());
  setAuthCookie(response, token);
  return response;
});
