// dao/project.dao.js
import Project from "../models/project.model.js";

export const create = async (data) => {
  return await Project.create(data);
};

export const findAll = async () => {
  return await Project.find()
    .populate("author", "name email")
    .populate("category", "name")
    .populate("tags", "name");
};

export const findById = async (id) => {
  console.log("dao id:", id);
  return await Project.findById(id)
    .populate("author", "name email")
    .populate("category", "name")
    .populate("tags", "name")
};

export const updateById = async (id, data) => {
  return await Project.findByIdAndUpdate(id, data, { new: true });
};

export const deleteById = async (id) => {
  return await Project.findByIdAndDelete(id);
};

export const findByUserId = async (userId) => {
  return await Project.find({ author: userId }).populate("category tags");
};

export const findByCategory = async (categoryId) => {
  return await Project.find({ category: categoryId }).populate("author tags");
};

export const search = async (query) => {
  return await Project.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
  }).populate("author category tags");
};

export const findRecent = async (limit = 5) => {
  return await Project.find().sort({ createdAt: -1 }).limit(limit);
};

export const findPopular = async (limit = 5) => {
  return await Project.find().sort({ views: -1 }).limit(limit);
};

export const paginate = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const projects = await Project.find().skip(skip).limit(limit);
  const total = await Project.countDocuments();
  return { projects, total, page, pages: Math.ceil(total / limit) };
};
