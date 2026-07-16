import { NextRequest } from "next/server";
import User from "@/lib/models/User";
import { catchAsync } from "@/lib/api-helpers/catchAsync";
import { success } from "@/lib/api-helpers/response";
import { AppError } from "@/lib/api-helpers/AppError";
import { signToken } from "@/lib/auth/jwt";
import { setAuthCookie } from "@/lib/auth/cookies";

export const POST = catchAsync(async (req: NextRequest) => {
  const body = await req.json();
  const { name, email, password, role, institutionName, idProofUrl } = body;

  if (!name || !email || !password) {
    throw new AppError("Name, email, and password are required.", 400);
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "student",
    institutionName,
    idProofUrl,
  });

  const token = signToken(String(user._id));
  const response = success(user.toJSON(), { status: 201 });
  setAuthCookie(response, token);
  return response;
});
