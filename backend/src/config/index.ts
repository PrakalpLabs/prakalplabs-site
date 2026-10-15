import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/prakalp_labs",
  jwtSecret: process.env.JWT_SECRET || "prakalp_labs_jwt_secret_dev_key_do_not_use_in_prod_9876",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  adminSetupSecret: process.env.ADMIN_SETUP_SECRET || "prakalp_admin_setup_key_2026",
  cookieSecure: process.env.NODE_ENV === "production",
};
