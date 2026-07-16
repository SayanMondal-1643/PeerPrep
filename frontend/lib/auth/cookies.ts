import { NextResponse } from "next/server";

export const COOKIE_NAME = process.env.COOKIE_NAME || "peerprep_jwt";

const COOKIE_EXPIRES_DAYS = Number(process.env.JWT_COOKIE_EXPIRES_IN || 7);

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_EXPIRES_DAYS * 24 * 60 * 60,
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
