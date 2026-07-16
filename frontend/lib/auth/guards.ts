import { NextRequest } from "next/server";
import { IUser, UserRole } from "@/lib/models/User";
import { getCurrentUser } from "./getCurrentUser";
import { AppError } from "@/lib/api-helpers/AppError";

export async function requireAuth(req: NextRequest): Promise<IUser> {
  const user = await getCurrentUser(req);

  if (!user) {
    throw new AppError("You are not logged in. Please log in to get access.", 401);
  }

  return user;
}

export function requireRole(user: IUser, ...roles: UserRole[]) {
  if (!roles.includes(user.role)) {
    throw new AppError("You do not have permission to perform this action.", 403);
  }
}

export function requireOwnerOrAdmin(user: IUser, ownerId: string) {
  if (user.role !== "admin" && String(user._id) !== String(ownerId)) {
    throw new AppError("You do not have permission to perform this action.", 403);
  }
}
