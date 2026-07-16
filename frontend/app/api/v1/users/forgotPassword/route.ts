import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { AppError } from "@/lib/api-helpers/AppError";
import { sendEmail } from "@/lib/mail/sendEmail";
import { passwordResetEmail } from "@/lib/mail/templates";

export const POST = catchAsync(async (req: NextRequest) => {
  const { email } = await req.json();

  if (!email) {
    throw new AppError("Please provide an email address.", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("There is no user with that email address.", 404);
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const origin = req.headers.get("origin") || req.nextUrl.origin;
  const resetURL = `${origin}/auth/reset-password/${resetToken}`;

  try {
    const { subject, text, html } = passwordResetEmail(resetURL);
    await sendEmail({ to: user.email, subject, text, html });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError("There was an error sending the email. Try again later.", 500);
  }

  return NextResponse.json(
    { status: "success", message: "Token sent to email!" },
    { status: 200 },
  );
});
