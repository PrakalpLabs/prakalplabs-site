import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  // Check HTTP-only cookie first, then Authorization header fallback
  const token =
    req.cookies?.admin_token ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    res.status(401).json({
      success: false,
      error: "Unauthorized: Administrative access token missing or expired.",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as {
      id: string;
      email: string;
      name: string;
      role: string;
    };

    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      error: "Unauthorized: Invalid or expired administrative session.",
    });
  }
}
