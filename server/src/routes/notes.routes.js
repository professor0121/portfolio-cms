import { Router } from "express";
import * as notesController from "../controllers/notes.controller.js";

const router = Router();

// Destructure all controller functions
const {
  createNote,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
  getNotesByUserId,
  getNotesByCategory,
  searchNotes,
  getRecentNotes,
  getPopularNotes,
  getNotesByPagination
} = notesController;

// Notes CRUD routes
router.post("/create", createNote);
router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.patch("/:id", updateNoteById);
router.delete("/:id", deleteNoteById);

// Additional routes
router.get("/user/:userId", getNotesByUserId);
router.get("/category/:category", getNotesByCategory);
router.get("/search", searchNotes);
router.get("/recent", getRecentNotes);
router.get("/popular", getPopularNotes);
router.get("/pagination", getNotesByPagination);

export default router;
