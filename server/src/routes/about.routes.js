import express from "express";
import { fetchAbout, updateAbout } from "../controllers/about.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware.js"; // optional admin auth

const router = express.Router();

router.get("/", fetchAbout);

router.post("/", userAuthMiddleware, updateAbout);

export default router;
