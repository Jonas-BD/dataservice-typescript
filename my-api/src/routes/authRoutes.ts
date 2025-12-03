import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getUserProfile } from "../controllers/authController.js";

const router = Router()

router.get('/authenticate', authenticateToken, getUserProfile)

export { router as authRoutes }