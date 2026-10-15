import { Router } from "express";
import { login, logout, getMe, setupAdmin } from "../controllers/auth.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireAdmin, getMe);
router.post("/setup-admin", setupAdmin);

export default router;
