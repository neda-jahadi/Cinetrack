import express from "express";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/tokens.js";
import { loginUser, registerUser, logoutUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;