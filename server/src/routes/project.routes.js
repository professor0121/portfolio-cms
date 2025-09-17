import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";

const router = Router();
const { createProject, getAllProjects, getProjectById, updateProjectById, deleteProjectById, getProjectsByUserId, getProjectsByCategory, searchProjects, getRecentProjects, getPopularProjects, getProjectsByPagination } = projectController;  
router.post("/create", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.patch("/:id", updateProjectById);
router.delete("/:id", deleteProjectById);
router.get("/user/:userId", getProjectsByUserId);
router.get("/category/:category", getProjectsByCategory);
router.get("/search", searchProjects);
router.get("/recent", getRecentProjects);
router.get("/popular", getPopularProjects);
router.get("/pagination", getProjectsByPagination);
export default router;