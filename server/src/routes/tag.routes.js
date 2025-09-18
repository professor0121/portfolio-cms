import { Router } from "express";
import {
  createTag,
  getTag,
  getAllTags,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";

const tagRouter = Router();

// Define routes in a structured way
tagRouter
  .route("/")
  .get(getAllTags)   // GET all tags
  .post(createTag);  // CREATE new tag

tagRouter
  .route("/:id")
  .get(getTag)       // GET tag by ID
  .patch(updateTag)  // UPDATE tag
  .delete(deleteTag);// DELETE tag

export default tagRouter;
