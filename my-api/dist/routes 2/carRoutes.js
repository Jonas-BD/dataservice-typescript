import { Router } from "express";
import { createRecord } from "../controllers/carController.js";
const router = Router();
router.get('/', createRecord);
export const carRoutes = router;
