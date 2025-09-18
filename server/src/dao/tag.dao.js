import Tag from "../models/tags.model.js"; // Assuming mongoose schema

export const createTagDAO = async (data) => {
  return await Tag.create(data);
};

export const getTagByIdDAO = async (id) => {
  return await Tag.findById(id);
};

export const getAllTagsDAO = async () => {
  return await Tag.find();
};

export const updateTagDAO = async (id, data) => {
  return await Tag.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTagDAO = async (id) => {
  return await Tag.findByIdAndDelete(id);
};
