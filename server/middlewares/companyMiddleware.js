import { prisma } from "../configs/prisma.js";

export const companyApprovedCheck = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const company = await prisma.company.findUnique({
      where: { userId },
    });

    if (!company) {
      return res.status(404).json({
        error: "No company found for this user",
      });
    }

    if (company.status !== "APPROVED") {
      return res.status(403).json({
        error: "Company is not approved yet",
      });
    }

    // attach company to request for later use
    req.company = company;

    next();
  } catch (error) {
    return res.status(500).json({
      error: "Failed to verify company status",
    });
  }
};