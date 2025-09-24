import {
  createReviewDAO,
  getReviewsByReferenceDAO,
  deleteReviewDAO,
} from "../dao/review.dao.js";

export const createReviewService = async (data) => {
  return createReviewDAO(data);
};

export const getReviewsService = async (type, typeId) => {
  return getReviewsByReferenceDAO(type, typeId);
};

export const deleteReviewService = async (reviewId) => {
  return deleteReviewDAO(reviewId);
};
