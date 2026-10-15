import { Router } from "express";
import {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
} from "../controllers/inquiry.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();

// Public submission route
router.post("/inquiries", createInquiry);

// Admin-only review routes
router.get("/admin/inquiries", requireAdmin, getInquiries);
router.get("/admin/inquiries/:id", requireAdmin, getInquiryById);
router.patch("/admin/inquiries/:id", requireAdmin, updateInquiryStatus);

export default router;
