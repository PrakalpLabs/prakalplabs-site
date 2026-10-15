import { Router } from "express";
import healthRoutes from "./health.routes";
import authRoutes from "./auth.routes";
import projectRoutes from "./project.routes";
import serviceRoutes from "./service.routes";
import inquiryRoutes from "./inquiry.routes";

const router = Router();

router.use("/", healthRoutes);
router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/services", serviceRoutes);
router.use("/", inquiryRoutes);

export default router;
