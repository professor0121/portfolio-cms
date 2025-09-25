// routes/contact.routes.js
import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contact.controller.js";

const router = express.Router();

// Public route for submitting contact form
router.post("/", createContact);

// Admin routes
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContactStatus);
router.delete("/:id", deleteContact);

export default router;
