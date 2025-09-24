import {
  createCommentDAO,
  getCommentsByReferenceDAO,
  likeCommentDAO,
  unlikeCommentDAO,
} from "../dao/comment.dao.js";

export const createCommentService = async (data) => {
  return createCommentDAO(data);
};

export const getCommentsService = async (type, id) => {
  return getCommentsByReferenceDAO(type, id);
};

export const likeCommentService = async (commentId, userId) => {
  return likeCommentDAO(commentId, userId);
};

export const unlikeCommentService = async (commentId, userId) => {
  return unlikeCommentDAO(commentId, userId);
};
