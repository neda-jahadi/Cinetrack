import Job from '../models/Jobs.js';
import mongoose from "mongoose";

export const getJobs = async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit ?? "0", 10) || 0, 50);
        const SORT_MAP = {
          recent: { createdAt: -1 },
          salary_asc: { salary: 1 },
          salary_desc: { salary: -1 },
        };
        const sortKey = req.query.sort;

        if (sortKey && !SORT_MAP[sortKey]) {
          return res.status(400).json({ success: false, message: "Invalid sort option" });
        }

        const sort = SORT_MAP[req.query.sort] ?? { createdAt: -1 };

        const query = Job.find().sort(sort);
        if (limit > 0) query.limit(limit);

        const jobs = await query;

        res.status(200).json({ success: true, data: jobs });
 
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getSingleJob = async (req, res) => {
  const jobId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job id",
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({message: false, message: "Job not found"});
    }
    res.status(200).json({success: true, data: job});
  } catch (error) {
    console.error("getSingleJob error:", error);
    res.status(500).json({success: false, message: 'Internal server error'});
  }
}

export const createSingleJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    return res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Create job error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
}

export const updateSingleJob = async (req, res) => {

}

export const deleteSingleJob = async (req, res) => {
  const jobId = req.params.id;
  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);
    if(!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found"
      })
    }

    return res.status(200).json({
      success: true,
      messgae: "Job deleted succesfully"
    })
  } catch (error) {
    console.error("Delete job error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete job",
    });
  }
}