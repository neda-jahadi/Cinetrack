import express from 'express';
import { requireAuth } from "../middlewares/requireAuth.js";
import { createSingleJob, deleteSingleJob, getJobs, getSingleJob, updateSingleJob } from '../controllers/job.controller.js';
import { validateObjectId } from '../middlewares/validateObjectId.js';

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", validateObjectId("id"), getSingleJob)
router.post("/", createSingleJob)
router.delete("/:id", validateObjectId("id"), deleteSingleJob)
router.put("/:id", validateObjectId("id"), updateSingleJob)

export default router;