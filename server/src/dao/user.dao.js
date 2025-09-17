import User from "../models/user.model.js";

export const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
};

export const findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    throw new Error("Error finding user by email: " + err.message);
  }
};
export const updateUserByEmail = async (email, updateData) => {
  return await User.findOneAndUpdate(
    { email },
    { $set: updateData },
    { new: true } // return updated doc
  );
};