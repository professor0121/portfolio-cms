import express from "express";
import multer from "multer";
import { uploadMedia, deleteMedia, getAllMedia } from "../utils/cloudinary.utils.js";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp folder

// Upload any media
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const result = await uploadMedia(filePath, "cms");

    // Delete local temp file
    fs.unlinkSync(filePath);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete media
router.delete("/delete/:public_id", async (req, res) => {
  try {
    const result = await deleteMedia(req.params.public_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all media
router.get("/all", async (req, res) => {
  try {
    const media = await getAllMedia();
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
