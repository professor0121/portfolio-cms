import {
  createReviewService,
  getReviewsService,
  deleteReviewService,
} from "../services/review.service.js";

export const createReview = async (req, res) => {
  try {
    const { type, typeId, rating, comment } = req.body;
    const userId = req.user._id;

    if (!["post", "project", "course", "note"].includes(type)) {
      return res.status(400).json({ message: "Invalid review type" });
    }

    const data = {
      user: userId,
      rating,
      comment,
      [type]: typeId,
    };

    const review = await createReviewService(data);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { type, typeId } = req.params;

    if (!["post", "project", "course", "note"].includes(type)) {
      return res.status(400).json({ message: "Invalid review type" });
    }

    const reviews = await getReviewsService(type, typeId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    await deleteReviewService(reviewId);
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
