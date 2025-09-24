import express from "express";
import {
  createReview,
  getReviews,
  deleteReview,
} from "../controllers/review.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware.js"; // your auth middleware

const router = express.Router();

// Create a review
router.post("/", userAuthMiddleware, createReview);

// Get reviews by type and typeId
router.get("/:type/:typeId", getReviews);

// Delete a review
router.delete("/:reviewId", userAuthMiddleware, deleteReview);

export default router;
