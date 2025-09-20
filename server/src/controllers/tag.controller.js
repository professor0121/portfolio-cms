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
    const { id } = req.params;
    const data = req.body;

    const updatedTag = await updateTagService(id, data);
    res.status(200).json({ success: true, data: updatedTag });
  } catch (error) {
    // Send proper error message
    res.status(400).json({ success: false, error: error.message });
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
