import { NextRequest } from "next/server";
import crypto from "crypto";
import User from "@/lib/models/User";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { signToken } from "@/lib/auth/jwt";
import { setAuthCookie } from "@/lib/auth/cookies";

export const POST = catchAsync(
  async (req: NextRequest, { params }: { params: Promise<{ token: string }> }) => {
    const { token } = await params;
    const { password } = await req.json();

    if (!password) {
      throw new AppError("Please provide a new password.", 400);
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new AppError("Token is invalid or has expired.", 400);
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    const newToken = signToken(String(user._id));
    const response = success(user.toJSON());
    setAuthCookie(response, newToken);
    return response;
  },
);
