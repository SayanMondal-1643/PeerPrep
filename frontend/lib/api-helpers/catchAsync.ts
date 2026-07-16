import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connect";
import { handleRouteError } from "./errorHandler";

type RouteHandler<Context = unknown> = (
  req: NextRequest,
  context: Context,
) => Promise<NextResponse>;

export function catchAsync<Context = unknown>(handler: RouteHandler<Context>): RouteHandler<Context> {
  return async (req, context) => {
    try {
      await connectDB();
      return await handler(req, context);
    } catch (err) {
      return handleRouteError(err);
    }
  };
}
