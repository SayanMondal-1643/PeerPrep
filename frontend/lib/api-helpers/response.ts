import { NextResponse } from "next/server";

export function success<T>(
  data: T,
  options?: { status?: number; results?: number; message?: string },
) {
  const body: Record<string, unknown> = { status: "success", data };

  if (options?.results !== undefined) {
    body.results = options.results;
  }

  if (options?.message !== undefined) {
    body.message = options.message;
  }

  return NextResponse.json(body, { status: options?.status ?? 200 });
}
