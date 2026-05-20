import express from 'express';
import { getAllMunicipalities } from '../controllers/locationControllers.js';

const router = express.Router();

router.get("/", getAllMunicipalities)

export default router;