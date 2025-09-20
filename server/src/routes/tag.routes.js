import { Router } from "express";
import {
  createTag,
  getTag,
  getAllTags,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware.js";


const tagRouter = Router();

// Public routes
tagRouter.get("/", getAllTags);
tagRouter.get("/:id", getTag);

// Protected routes (Admins only)
tagRouter.post("/", userAuthMiddleware, createTag);
tagRouter.patch("/:id", userAuthMiddleware, updateTag);
tagRouter.delete("/:id", userAuthMiddleware, deleteTag);

export default tagRouter;
