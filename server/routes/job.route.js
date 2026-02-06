import express from 'express';
import { createSingleJob, deleteSingleJob, getJobs, getSingleJob, updateSingleJob } from '../controllers/job.controller.js';

const router = express.Router();

router.get("/", getJobs);
router.get("/:id", getSingleJob)
router.post("/", createSingleJob)
router.delete("/:id", deleteSingleJob)
router.put("/:id", updateSingleJob)

export default router;