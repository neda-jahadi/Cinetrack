import Job from '../models/Jobs.js';

export const getJobs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 4;
    const page = parseInt(req.query.page, 10) || 1;

    const SORT_MAP = {
      recent: { createdAt: -1 },
      salary_asc: { salary: 1 },
      salary_desc: { salary: -1 },
    };

    const sortKey = req.query.sort;

    if (sortKey && !SORT_MAP[sortKey]) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid sort option" });
    }

    const sort = SORT_MAP[sortKey] ?? { createdAt: -1 };

    const safeLimit = limit > 0 ? limit : 6;
    const safePage = page > 0 ? page : 1;
    const skip = (safePage - 1) * safeLimit;

    const totalJobs = await Job.countDocuments();

    const jobs = await Job.find()
      .sort(sort)
      .skip(skip)
      .limit(safeLimit);

    const totalPages = Math.ceil(totalJobs / safeLimit);

    res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        totalJobs,
        totalPages,
        currentPage: safePage,
        limit: safeLimit,
        hasNextPage: safePage < totalPages,
        hasPrevPage: safePage > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSingleJob = async (req, res) => {
  const jobId = req.params.id;
  try {
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
    const jobId = req.params.id;
    try {
      const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true, runValidators: true, context: "query" });
      if (!updatedJob) {
          return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedJob,
      })
    } catch (error) {
      console.error("Update job error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Failed to update job",
      });
    }
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