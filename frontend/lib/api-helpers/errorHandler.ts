import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { AppError } from "./AppError";

interface MongoDuplicateKeyError extends Error {
  code: number;
  keyValue?: Record<string, unknown>;
}

function isDuplicateKeyError(err: unknown): err is MongoDuplicateKeyError {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: unknown }).code === 11000
  );
}

export function formatError(err: unknown): { statusCode: number; message: string } {
  if (err instanceof AppError) {
    return { statusCode: err.statusCode, message: err.message };
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message);
    return { statusCode: 400, message: messages.join(". ") };
  }

  if (err instanceof mongoose.Error.CastError) {
    return { statusCode: 400, message: `Invalid ${err.path}: ${err.value}` };
  }

  if (isDuplicateKeyError(err)) {
    const field = err.keyValue ? Object.keys(err.keyValue)[0] : "field";
    return { statusCode: 400, message: `Duplicate value for ${field}. Please use another value.` };
  }

  if (err instanceof Error && err.name === "JsonWebTokenError") {
    return { statusCode: 401, message: "Invalid token. Please log in again." };
  }

  if (err instanceof Error && err.name === "TokenExpiredError") {
    return { statusCode: 401, message: "Your session has expired. Please log in again." };
  }

  console.error("UNHANDLED ERROR:", err);
  return { statusCode: 500, message: "Something went wrong" };
}

export function handleRouteError(err: unknown) {
  const { statusCode, message } = formatError(err);
  const status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

  return NextResponse.json({ status, message }, { status: statusCode });
}
