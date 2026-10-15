import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin";
import { config } from "../config";
import { loginSchema, setupAdminSchema } from "../validators/auth.validator";
import { AuthRequest } from "../middleware/auth.middleware";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      res.status(401).json({
        success: false,
        error: "Invalid email credentials or administrative password.",
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!isValidPassword) {
      res.status(401).json({
        success: false,
        error: "Invalid email credentials or administrative password.",
      });
      return;
    }

    // Sign JWT
    const token = jwt.sign(
      {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    // Set secure HTTP-only cookie
    res.cookie("admin_token", token, {
      httpOnly: true,
      secure: config.cookieSecure,
      sameSite: config.cookieSecure ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Authentication successful.",
      data: {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
}

export function logout(req: Request, res: Response): void {
  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: config.cookieSecure ? "none" : "lax",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Administrative session terminated successfully.",
  });
}

export function getMe(req: AuthRequest, res: Response): void {
  if (!req.admin) {
    res.status(401).json({ success: false, error: "Not authenticated" });
    return;
  }

  res.status(200).json({
    success: true,
    data: req.admin,
  });
}

export async function setupAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password, name, setupSecret } = setupAdminSchema.parse(req.body);

    // Verify secret
    if (setupSecret !== config.adminSetupSecret) {
      res.status(403).json({
        success: false,
        error: "Forbidden: Invalid administrator setup secret.",
      });
      return;
    }

    // Check if email already exists
    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      res.status(409).json({
        success: false,
        error: "Conflict: An administrator with this email already exists.",
      });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      email: email.toLowerCase(),
      passwordHash,
      name,
      role: "superadmin",
    });

    res.status(201).json({
      success: true,
      message: "Administrator account provisioned successfully.",
      data: {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
}
