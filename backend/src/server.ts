import { createApp } from "./app";
import { connectDB } from "./config/db";
import { config } from "./config";

async function startServer() {
  const app = createApp();

  // Connect to MongoDB
  await connectDB();

  const server = app.listen(config.port, () => {
    console.log(`[Prakalp Labs Backend] Server running in ${config.nodeEnv} mode on port ${config.port}`);
    console.log(`[Prakalp Labs Backend] Health check endpoint: http://localhost:${config.port}/api/v1/health`);
    console.log(`[Prakalp Labs Backend] CORS enabled for: ${config.frontendUrl}`);
  });

  // Graceful shutdown
  const shutdown = () => {
    console.log("[Prakalp Labs Backend] Shutting down gracefully...");
    server.close(() => {
      console.log("[Prakalp Labs Backend] HTTP server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer().catch((err) => {
  console.error("[Prakalp Labs Backend Fatal Error]:", err);
  process.exit(1);
});
