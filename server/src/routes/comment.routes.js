import express from "express";
import {
  createComment,
  getComments,
  likeComment,
  unlikeComment,
} from "../controllers/comment.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware.js"; // assuming you have auth

const router = express.Router();

// Create comment
router.post("/", userAuthMiddleware, createComment);

// Get comments by type and typeId (post/course/project/note)
router.get("/:type/:typeId", getComments);

// Like & Unlike
router.post("/like/:commentId", userAuthMiddleware, likeComment);
router.post("/unlike/:commentId", userAuthMiddleware, unlikeComment);

export default router;
