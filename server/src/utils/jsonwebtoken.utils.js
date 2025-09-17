import jwt from "jsonwebtoken";
import ENV from "../config/env.config.js"
const JWT_SECRET = ENV.JWT_SECRET
const JWT_EXPIRES_IN = ENV.JWT_EXPIRES_IN

/**
 * Generate a JWT token
 * @param {Object} payload - Data to include in the token (e.g., { userId: user._id })
 * @param {string} expiresIn - Optional expiration time
 * @returns {string} - Signed JWT token
 */
export const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verify a JWT token
 * @param {string} token - JWT token string
 * @returns {Object} - Decoded payload if valid
 * @throws {Error} - Throws if token is invalid or expired
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
