import Post from "../models/post.model.js";

export const createPostDao = async (postData) => {
  const post = new Post(postData);
  return await post.save();
}