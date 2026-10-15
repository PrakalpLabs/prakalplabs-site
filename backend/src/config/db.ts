import mongoose from "mongoose";
import { config } from "./index";

// Disable buffering so operations fail fast if DB is disconnected
mongoose.set("bufferCommands", false);

let isConnected = false;

export async function connectDB(): Promise<typeof mongoose | null> {
  if (isConnected) {
    return mongoose;
  }

  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected to database: ${conn.connection.name}`);
    return conn;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown database connection error";
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at ${config.mongodbUri}: ${message}`);
    console.warn("[MongoDB Info] Operating in fallback mode. When MongoDB is available, real persistence will be active.");
    return null;
  }
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}
