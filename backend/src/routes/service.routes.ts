import { Router } from "express";
import {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/", getServices);
router.get("/:slug", getServiceBySlug);

// Admin-only mutation routes
router.post("/", requireAdmin, createService);
router.patch("/:id", requireAdmin, updateService);
router.delete("/:id", requireAdmin, deleteService);

export default router;
