import { Router } from "express";
import { createRecord, getRecord, getRecords, updateRecord } from "../controllers/carController.js";

const router = Router()
router.get('/', getRecords)
router.get('/:id', getRecord)
router.post('/', createRecord)
router.put('/:id', updateRecord)

export const carRoutes = router