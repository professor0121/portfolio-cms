import Review from "../models/review.model.js";

export const createReviewDAO = async (data) => {
  const review = new Review(data);
  return review.save();
};

export const getReviewsByReferenceDAO = async (type, typeId) => {
  const query = {};
  query[type] = typeId;
  return Review.find(query).populate("user", "name email");
};

export const deleteReviewDAO = async (reviewId) => {
  return Review.findByIdAndDelete(reviewId);
};
