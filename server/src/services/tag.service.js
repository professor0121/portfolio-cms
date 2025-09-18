import {
  createTagDAO,
  getTagByIdDAO,
  getAllTagsDAO,
  updateTagDAO,
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
  const tag = await updateTagDAO(id, data);
  if (!tag) throw new Error("Tag not found");
  return tag;
};

export const deleteTagService = async (id) => {
  const tag = await deleteTagDAO(id);
  if (!tag) throw new Error("Tag not found");
  return tag;
};
