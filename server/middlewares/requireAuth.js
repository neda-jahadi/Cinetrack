import { verifyAccessToken } from "../utils/tokens.js";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [, token] = header.split(" ");

  if (!token) return res.status(401).json({ message: "Missing access token" });

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid/expired access token" });
  }
}