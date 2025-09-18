import {
  createCategoryDAO,
  getAllCategoriesDAO,
  getCategoryByIdDAO,
  updateCategoryByIdDAO,
  deleteCategoryByIdDAO,
} from "../dao/category.dao.js";

export const createCategoryService = async (data) => {
  return await createCategoryDAO(data);
};

export const getAllCategoriesService = async () => {
  return await getAllCategoriesDAO();
};

export const getCategoryByIdService = async (id) => {
  const category = await getCategoryByIdDAO(id);
  if (!category) throw new Error("Category not found");
  return category;
};

export const updateCategoryByIdService = async (id, data) => {
  const category = await updateCategoryByIdDAO(id, data);
  if (!category) throw new Error("Category not found");
  return category;
};

export const deleteCategoryByIdService = async (id) => {
  const category = await deleteCategoryByIdDAO(id);
  if (!category) throw new Error("Category not found");
  return category;
};
