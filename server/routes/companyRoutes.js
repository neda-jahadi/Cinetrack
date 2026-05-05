import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { addCompany, getAllCompanies, getCompanyStatus, updateCompanyStatus } from '../controllers/companyController.js';
import { addCompanySchema } from '../validators/addCompanyValidators.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post("/", authMiddleware, validateRequest(addCompanySchema), addCompany)
router.get("/:id", authMiddleware, authorizeRoles("ADMIN"), getCompanyStatus)
router.get("/all", authMiddleware, getAllCompanies)
router.patch("/:id/status", authMiddleware, authorizeRoles("ADMIN"), updateCompanyStatus)

export default router;