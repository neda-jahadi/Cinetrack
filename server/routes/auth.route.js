import express from "express";
import { loginUser, registerUser, logoutUser, getMe } from "../controllers/auth.controller.js";
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { loginSchema, registerSchema } from "../validators/authValidators.js";
import { validateRequest } from '../middlewares/validateRequest.js';



const router = express.Router();

router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getMe);

export default router;