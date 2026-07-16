import { NextRequest } from "next/server";
import User, { IUser } from "@/lib/models/User";
import { verifyToken } from "./jwt";
import { COOKIE_NAME } from "./cookies";
import { AppError } from "@/lib/api-helpers/AppError";

/**
 * Returns the current user for a request, or null if there is no cookie.
 * Throws AppError(401) if a cookie is present but invalid/expired/stale.
 */
export async function getCurrentUser(req: NextRequest): Promise<IUser | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new AppError("Invalid or expired session. Please log in again.", 401);
  }

  const user = await User.findById(payload.id).select("+passwordChangedAt");

  if (!user) {
    throw new AppError("The user belonging to this session no longer exists.", 401);
  }

  if (user.accountStatus === "suspended") {
    throw new AppError("Your account has been suspended.", 403);
  }

  if (user.changedPasswordAfter(payload.iat)) {
    throw new AppError("Password was recently changed. Please log in again.", 401);
  }

  return user;
}
