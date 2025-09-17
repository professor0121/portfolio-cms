import { verifyToken } from "../utils/jsonwebtoken.utils.js";
import client from "../config/redis.config.js";

export const userAuthMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.auth_token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token" });
    }

  
    const isBlacklisted = await client.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ error: "Unauthorized: Token is blacklisted" });
    }

    // Verify JWT
    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
