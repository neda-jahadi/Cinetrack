import Job from '../models/Jobs.js';
import mongoose from "mongoose";

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({createAt: -1});
        res.status(200).json({success: true, data: jobs})
 
    } catch (error) {
        console.error("Error in getJobs:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getSingleJob = async (req, res) => {

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

}