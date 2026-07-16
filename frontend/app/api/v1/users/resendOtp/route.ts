import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { AppError } from "@/lib/api-helpers/AppError";
import { sendEmail } from "@/lib/mail/sendEmail";
import { otpVerificationEmail } from "@/lib/mail/templates";

export const POST = catchAsync(async (req: NextRequest) => {
  const { email } = await req.json();

  if (!email) {
    throw new AppError("Email is required.", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("No pending signup found for that email.", 404);
  }

  if (user.isEmailVerified) {
    throw new AppError("This account is already verified.", 400);
  }

  const otp = user.createEmailVerificationOTP();
  await user.save({ validateBeforeSave: false });

  try {
    const { subject, text, html } = otpVerificationEmail(otp);
    await sendEmail({ to: user.email, subject, text, html });
  } catch {
    throw new AppError("There was an error sending the verification email. Please try again.", 500);
  }

  return NextResponse.json({
    status: "success",
    message: "A new verification code has been sent to your email.",
  });
});
