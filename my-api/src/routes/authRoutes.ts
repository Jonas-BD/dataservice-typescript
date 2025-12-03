import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken.js";
import { getUserProfile } from "../controllers/authController.js";
import { authorizeRole } from "../middleware/authorizeRole.js";

const router = Router()

router.get('/authenticate', authenticateToken, authorizeRole('ADMIN', 'USER'), getUserProfile)

export { router as authRoutes }