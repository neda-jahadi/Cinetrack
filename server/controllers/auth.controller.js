import bcrypt from "bcrypt";
import User from "../models/User.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/tokens.js";



export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already in use" });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });

  res.status(201).json({ id: user._id, email: user.email, name: user.name });

  return res.status(201).json({ id: user._id, email: user.email, name: user.name });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const accessToken = signAccessToken(user._id.toString());

  res.json({
    accessToken,
    user: { id: user._id, email: user.email, name: user.name },
  });
}