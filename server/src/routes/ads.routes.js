import express from "express";
import {
  fetchAds,
  fetchAd,
  createAd,
  updateAd,
  deleteAd,
} from "../controllers/ad.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware.js"; // optional admin protection

const router = express.Router();

// Public route to fetch all active ads
router.get("/", fetchAds);

// Admin-protected routes
router.get("/:id", userAuthMiddleware, fetchAd);
router.post("/", userAuthMiddleware, createAd);
router.put("/:id", userAuthMiddleware, updateAd);
router.delete("/:id", userAuthMiddleware, deleteAd);

export default router;
