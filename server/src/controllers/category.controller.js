import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryByIdService,
  deleteCategoryByIdService,
} from "../services/category.service.js";
import slugify from "slugify";

export const createCategory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { name, description, parent } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Name is required" });
    }
    if (!description) {
      return res.status(400).json({ success: false, message: "Description is required" });
    }

    const slug = slugify(name, { lower: true });
    req.body.slug = slug;
    req.body.createdBy = userId;

    // ✅ Handle parent properly
    if (!parent || parent === "") {
      req.body.parent = null;
    } else {
      req.body.parent = parent;
    }

    const category = await createCategoryService(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await getAllCategoriesService();
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await getCategoryByIdService(req.params.id);
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    const category = await updateCategoryByIdService(req.params.id, req.body);
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryById = async (req, res, next) => {
  try {
    await deleteCategoryByIdService(req.params.id);
    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
