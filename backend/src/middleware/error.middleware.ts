import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { config } from "../config";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));

    res.status(400).json({
      success: false,
      error: "Validation error: Invalid input data.",
      details: formattedErrors,
    });
    return;
  }

  // Handle Mongoose duplicate key error (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    res.status(409).json({
      success: false,
      error: `Conflict: A record with this ${field} already exists.`,
    });
    return;
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      error: "Resource not found: Invalid resource identifier.",
    });
    return;
  }

  // Handle Mongoose disconnected / buffering errors gracefully
  if (err.name === "MongooseError" || err.message?.includes("buffering timed out") || err.message?.includes("before initial connection")) {
    res.status(503).json({
      success: false,
      error: "Service unavailable: Database connection not established. Configure MONGODB_URI to enable real database operations.",
    });
    return;
  }

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "An unexpected internal server error occurred.";

  // Safe response in production (no stack traces or internal leaks)
  res.status(statusCode).json({
    success: false,
    error: config.nodeEnv === "production" && statusCode === 500 ? "Internal server error." : message,
    ...(config.nodeEnv !== "production" && { stack: err.stack }),
  });
}
