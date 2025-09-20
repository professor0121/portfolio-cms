import {
  createTagService,
  getTagService,
  getAllTagsService,
  updateTagService,
  deleteTagService,
} from "../services/tag.service.js";
import slugify from "slugify";


export const createTag = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(req.user)
    const slug = slugify(name, { lower: true });

    const data = {
      name,
      slug,
      createdBy: req.user._id,
    };

    const tag = await createTagService(data);

    res.status(201).json({ success: true, data: tag });
  } catch (error) {
    next(error);
  }
};

export const getTag = async (req, res, next) => {
  try {
    const tag = await getTagService(req.params.id);
    res.json({ success: true, data: tag });
  } catch (error) {
    next(error);
  }
};

export const getAllTags = async (req, res, next) => {
  try {
    const tags = await getAllTagsService();
    res.json({ success: true, data: tags });
  } catch (error) {
    next(error);
  }
};

export const updateTag = async (req, res, next) => {
  try {
    const tag = await updateTagService(req.params.id, req.body);
    res.json({ success: true, data: tag });
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (req, res, next) => {
  try {
    await deleteTagService(req.params.id);
    res.json({ success: true, message: "Tag deleted successfully" });
  } catch (error) {
    next(error);
  }
};
