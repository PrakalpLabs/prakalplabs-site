import { Request, Response } from "express";
import { isDbConnected } from "../config/db";

export function getHealth(req: Request, res: Response): void {
  const dbStatus = isDbConnected() ? "connected" : "disconnected";

  res.status(200).json({
    success: true,
    data: {
      status: "operational",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      database: dbStatus,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    },
  });
}
