import { NextRequest } from "next/server";
import crypto from "crypto";
import User from "@/lib/models/User";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { signToken } from "@/lib/auth/jwt";
import { setAuthCookie } from "@/lib/auth/cookies";

export const POST = catchAsync(async (req: NextRequest) => {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    throw new AppError("Email and verification code are required.", 400);
  }

  const user = await User.findOne({ email }).select(
    "+emailVerificationOTP +emailVerificationOTPExpires",
  );

  if (!user) {
    throw new AppError("No pending signup found for that email.", 404);
  }

  if (user.isEmailVerified) {
    throw new AppError("This account is already verified.", 400);
  }

  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  if (
    user.emailVerificationOTP !== hashedOtp ||
    !user.emailVerificationOTPExpires ||
    user.emailVerificationOTPExpires < new Date()
  ) {
    throw new AppError("Invalid or expired verification code.", 400);
  }

  user.isEmailVerified = true;
  user.emailVerificationOTP = undefined;
  user.emailVerificationOTPExpires = undefined;
  await user.save({ validateBeforeSave: false });

  const token = signToken(String(user._id));
  const response = success(user.toJSON());
  setAuthCookie(response, token);
  return response;
});
