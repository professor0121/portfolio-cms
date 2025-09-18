import Category from "../models/category.model.js";

export const createCategoryDAO = async (data) => {
  return await Category.create(data);
};

export const getAllCategoriesDAO = async () => {
  return await Category.find().populate("parent").populate("createdBy");
};

export const getCategoryByIdDAO = async (id) => {
  return await Category.findById(id).populate("parent").populate("createdBy");
};

export const updateCategoryByIdDAO = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategoryByIdDAO = async (id) => {
  return await Category.findByIdAndDelete(id);
};
