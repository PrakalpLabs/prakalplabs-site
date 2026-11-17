import dotenv from "dotenv";
dotenv.config();

const requiredSecret = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be configured`);
  }
  return value;
};

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/prakalp_labs",
  jwtSecret: requiredSecret("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  adminSetupSecret: requiredSecret("ADMIN_SETUP_SECRET"),
  cookieSecure: process.env.NODE_ENV === "production",
};
