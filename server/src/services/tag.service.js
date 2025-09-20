import Tag from "../models/tags.model.js"

import {
  createTagDAO,
  getTagByIdDAO,
  getAllTagsDAO,
  deleteTagDAO,
} from "../dao/tag.dao.js";

export const createTagService = async (data) => {
  return await createTagDAO(data);
};

export const getTagService = async (id) => {
  const tag = await getTagByIdDAO(id);
  if (!tag) throw new Error("Tag not found");
  return tag;
};

export const getAllTagsService = async () => {
  return await getAllTagsDAO();
};

export const updateTagService = async (id, data) => {
  const { name } = data;

  // Check if the new name already exists in another tag
  if (name) {
    const existingTag = await Tag.findOne({ name: name.toLowerCase(), _id: { $ne: id } });
    if (existingTag) {
      throw new Error("Tag name already exists");
    }
  }

  const updatedTag = await Tag.findByIdAndUpdate(
    id,
    { name: name?.toLowerCase() },
    { new: true } // return the updated document
  );

  if (!updatedTag) throw new Error("Tag not found");

  return updatedTag;
};
export const deleteTagService = async (id) => {
  const tag = await deleteTagDAO(id);
  if (!tag) throw new Error("Tag not found");
  return tag;
};
