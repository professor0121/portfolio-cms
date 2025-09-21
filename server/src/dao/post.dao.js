import Post from "../models/post.model.js";

export const createPostDao = async (postData) => {
  const post = new Post(postData);
  return await post.save();
}

export const getAllPostsDao = async () => {
  return await Post.find()
    .populate("category")
    .populate("tags")
    .populate("author", "username email");
};

export const getPostByIdDao = async (id) => {
  return await Post.findById(id)
    .populate("category")
    .populate("tags")
    .populate("author", "username email")
    .populate("comments")
    .populate("review");
};

export const updatePostByIdDao = async (id, updateData) => {
  return await Post.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  )
    .populate("category")
    .populate("tags")
    .populate("author", "username email")
    .populate("comments")
    .populate("review");
};

export const deletePostByIdDao = async (id) => {
  return await Post.findByIdAndDelete(id)
    .populate("category")
    .populate("tags")
    .populate("author", "username email")
    .populate("comments")
    .populate("review");
};
