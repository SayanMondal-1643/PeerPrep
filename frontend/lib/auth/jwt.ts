import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}

export interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

export function signToken(userId: string): string {
  return jwt.sign({ id: userId }, JWT_SECRET as string, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET as string) as JwtPayload;
}
