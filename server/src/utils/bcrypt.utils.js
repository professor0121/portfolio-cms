import bcrypt from "bcrypt";

/**
 * Hash a plain text password
 * @param {string} password - Plain text password
 * @param {number} saltRounds - Number of salt rounds (default 10)
 * @returns {Promise<string>} - Hashed password
 */
export const hashPassword = async (password, saltRounds = 10) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

/**
 * Compare plain text password with hashed password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password from DB
 * @returns {Promise<boolean>} - true if match, false otherwise
 */
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

