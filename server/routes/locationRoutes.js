import express from 'express';
import { getAllMunicipalities, getAllRegions } from '../controllers/locationControllers.js';

const router = express.Router();

router.get("/municipalities", getAllMunicipalities);
router.get("/regions", getAllRegions);

export default router;