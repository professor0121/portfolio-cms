import { Router } from "express";
import * as postController from "../controllers/post.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware.js";

const router = Router();
const { createPost, getAllPosts, getPostById, updatePostById, deletePostById, getPostsByUserId, getPostsByCategory, searchPosts, getRecentPosts, getPopularPosts, getPostsByPagination } = postController;

router.post("/create",userAuthMiddleware, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.patch("/:id", updatePostById);
router.delete("/:id", deletePostById);
router.get("/user/:userId", getPostsByUserId);
router.get("/category/:category", getPostsByCategory);
router.get("/search", searchPosts);
router.get("/recent", getRecentPosts);
router.get("/popular", getPopularPosts);
router.get("/pagination", getPostsByPagination);

export default router;
