import Comment from "../models/comment.model.js";

export const createCommentDAO = async (data) => {
  const comment = new Comment(data);
  return comment.save();
};

export const getCommentsByParentDAO = async (parentId) => {
  return Comment.find({ parent: parentId }).populate("user", "name email");
};

export const getCommentsByReferenceDAO = async (type, id) => {
  const query = {};
  query[type] = id;
  return Comment.find(query)
    .populate("user", "name email")
    .populate("parent", "content user");
};

export const likeCommentDAO = async (commentId, userId) => {
  return Comment.findByIdAndUpdate(
    commentId,
    { $addToSet: { likes: userId } },
    { new: true }
  );
};

export const unlikeCommentDAO = async (commentId, userId) => {
  return Comment.findByIdAndUpdate(
    commentId,
    { $pull: { likes: userId } },
    { new: true }
  );
};
