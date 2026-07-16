import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { AppError } from "@/lib/api-helpers/AppError";
import { sendEmail } from "@/lib/mail/sendEmail";
import { otpVerificationEmail } from "@/lib/mail/templates";

export const POST = catchAsync(async (req: NextRequest) => {
  const body = await req.json();
  const { name, email, password, role, institutionName, idProofUrl } = body;

  if (!name || !email || !password) {
    throw new AppError("Name, email, and password are required.", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.isEmailVerified) {
    throw new AppError("An account with that email already exists.", 400);
  }

  // If a previous signup attempt was never verified, replace it with the new one.
  if (existingUser && !existingUser.isEmailVerified) {
    await User.findByIdAndDelete(existingUser._id);
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "student",
    institutionName,
    idProofUrl,
  });

  const otp = user.createEmailVerificationOTP();
  await user.save({ validateBeforeSave: false });

  try {
    const { subject, text, html } = otpVerificationEmail(otp);
    await sendEmail({ to: user.email, subject, text, html });
  } catch {
    await User.findByIdAndDelete(user._id);
    throw new AppError("There was an error sending the verification email. Please try again.", 500);
  }

  return NextResponse.json(
    {
      status: "success",
      message: "Verification code sent to email!",
      data: { email: user.email },
    },
    { status: 201 },
  );
});
