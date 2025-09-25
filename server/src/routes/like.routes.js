import express from "express";
import { likeController } from "../controllers/like.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware.js";

const router = express.Router();

// Like / Unlike
router.post("/like", userAuthMiddleware, likeController.like);
router.post("/unlike", userAuthMiddleware, likeController.unlike);

// Get likes
router.get("/:targetModel/:targetId", likeController.getLikes);
router.get("/:targetModel/:targetId/count", likeController.getLikesCount);

export default router;
