import { prisma } from "../configs/prisma.js";

export const getJobs = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 4;
    const page = parseInt(req.query.page, 10) || 1;

    const SORT_MAP = {
      recent: { createdAt: "desc" },
      salary_asc: { salary: "asc" },
      salary_desc: { salary: "desc" },
    };

    const sortKey = req.query.sort;

    if (sortKey && !SORT_MAP[sortKey]) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid sort option" });
    }

    const safeLimit = limit > 0 ? limit : 6;
    const safePage = page > 0 ? page : 1;
    const skip = (safePage - 1) * safeLimit;

    const [totalJobs, jobs] = await Promise.all([
      prisma.job.count(),
      prisma.job.findMany({
        skip,
        take: safeLimit,
        orderBy: SORT_MAP[sortKey] ?? { createdAt: "desc" },
        include: {
          company: true,
        },
      }),
    ]);

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
    console.error("getJobs error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSingleJob = async (req, res) => {
  try {
    const jobId = Number(req.params.id);
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { company: true },
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, data: job });
  } catch (error) {
    console.error("getSingleJob error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createSingleJob = async (req, res) => {
  try {
    const company = req.company;

    const { title, type, description, salary, location } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        type: type,
        description,
        salary,
        location,
        companyId: company.id,
      },
      include: {
        company: true
      }
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
      console.error("Create job error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create job",
      });
  }
};

export const updateSingleJob = async (req, res) => {
  const jobId = Number(req.params.id);

  try {
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
      include: { company: true },
    });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (existingJob.companyId !== req.company.id ) {
      return res.status(403).json({
        success: false, message: "you are not allowed to updet this job"
      })
    }

    const { title, type, description, salary, location } = req.body;

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        title,
        type,
        description,
        salary,
        location,
      },
      include: {
        company: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedJob,
    });
  } catch (error) {
    console.error("Update job error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update job",
    });
  }
};

export const deleteSingleJob = async (req, res) => {
  try {
    const jobId = Number(req.params.id);
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job Not Found",
      });
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Delete job error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete job",
    });
  }
};