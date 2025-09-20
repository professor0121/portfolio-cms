import { verifyToken } from "../utils/jsonwebtoken.utils.js";
import { findUserByEmail } from "../dao/user.dao.js";
import client from "../config/redis.config.js"; 

export const userAuthMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.auth_token || req.headers["authorization"]?.split(" ")[1];
    // console.log("Token received:", token);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token" });
    }

    // Check blacklist
    const isBlacklisted = await client.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({ error: "Unauthorized: Token is blacklisted" });
    }

    // Verify JWT
    let decoded;
    try {
      decoded = verifyToken(token);
      // console.log("Decoded token:", decoded);
    } catch (err) {
      // console.log("JWT verification failed:", err.message);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Fetch user
    const user = await findUserByEmail(decoded.email);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.user = user;
    // console.log("Authenticated user:", req.user);

    next();
  } catch (error) {
    console.log("Middleware error:", error);
    return res.status(401).json({ error: "Unauthorized: Something went wrong" });
  }
};
