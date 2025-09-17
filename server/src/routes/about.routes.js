import { Router } from "express";
import * as aboutController from "../controllers/about.controller.js";

const {
  createAbout,
  getAbout,
  getAboutById,
  updateAboutById,
  deleteAboutById,
  addSkill,
  removeSkill,
  updateSkill,
  addTeamMember,
  removeTeamMember,
  updateTeamMember,
  getAllTeamMembers
} = aboutController;

const router = Router();

router.post("/create", createAbout);
router.get("/", getAbout);
router.get("/:id", getAboutById);
router.patch("/:id", updateAboutById);
router.delete("/:id", deleteAboutById);

router.post("/addSkill", addSkill);
router.post("/removeSkill", removeSkill);
router.patch("/updateSkill", updateSkill); // fixed typo 'pathch' -> 'patch'

router.post("/teamMember", addTeamMember);
router.delete("/teamMember/:id", removeTeamMember);
router.patch("/teamMember/:id", updateTeamMember);
router.get("/teamMembers", getAllTeamMembers);

export default router;
