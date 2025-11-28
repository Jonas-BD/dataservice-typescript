import { Router } from "express";
import { createRecord, getRecord, getRecords } from "../controllers/carController.js";

const router = Router()
router.get('/', getRecords)
router.get('/:id', getRecord)
router.post('/', createRecord)

export const carRoutes = router