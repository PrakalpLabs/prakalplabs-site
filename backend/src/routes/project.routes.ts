import { Router } from "express";
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();

// Public routes
router.get("/", getProjects);
router.get("/:slug", getProjectBySlug);

// Admin-only mutation routes
router.post("/", requireAdmin, createProject);
router.patch("/:id", requireAdmin, updateProject);
router.delete("/:id", requireAdmin, deleteProject);

export default router;
