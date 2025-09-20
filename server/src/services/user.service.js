import { hashPassword, comparePassword } from "../utils/bcrypt.utils.js";
import { generateToken, generateRefreshToken } from "../utils/jsonwebtoken.utils.js";
import { createUser, findUserByEmail, updateUserByEmail } from "../dao/user.dao.js";
import client from "../config/redis.config.js";

export const registerUserService = async (userData) => {
  const { name, email, password, role } = userData;

  // check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  // hash password
  const hashedPassword = await hashPassword(password)

  // create user
  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  return newUser;
};

export const loginUserService = async ({ email, password }) => {
  // check if user exists
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // check password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // generate JWT
  const token = await generateToken({
    id: user._id,
    email: user.email
  });
  const refreshToken = generateRefreshToken({ userId: user._id });
  await client.set(`refresh_${user._id}`, refreshToken, { EX: 60 * 60 * 24 * 7 });
  return { user, token, refreshToken };
};

export const getUserService = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  return user;  
};

export const updateUserService = async (email, updateData) => {
  const updatedUser = await updateUserByEmail(email, updateData);
  if (!updatedUser) {
    throw new Error("User not found or update failed");
  }
  return updatedUser;
};