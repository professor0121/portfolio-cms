import {createPostDao,getAllPostsDao,getPostByIdDao,updatePostByIdDao,deletePostByIdDao} from "../dao/post.dao.js";

export const createPostService = async (postData) => {
  return await createPostDao(postData);
}

export const getAllPostsService = async () => {
  const getAllPosts = await getAllPostsDao();
  return { getAllPosts };
};

export const getPostByIdService = async (id) => {
  return await getPostByIdDao(id);
};

export const updatePostByIdService = async (id, updateData) => {
  if (updateData.featuredImage && typeof updateData.featuredImage === "string") {
    updateData.featuredImage = { url: updateData.featuredImage, alt: "" };
  }

  return await updatePostByIdDao(id, updateData);
};

export const deletePostByIdService = async (id) => {
  return await deletePostByIdDao(id);
};
