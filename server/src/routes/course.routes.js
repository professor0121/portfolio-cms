import { Router } from "express";
import * as courseController from "../controllers/course.controller.js";

const router = Router();

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  getCoursesByCategory,
  getCoursesByInstructor,
  searchCourses,
  getCoursesByPagination,
  getRecentCourses,
  getPopularCourses,
  enrollInCourse,
  unenrollFromCourse,
  rateCourse,
  reviewCourse,
  uploadCourseMedia
} = courseController;

// CRUD
router.post("/create", createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.patch("/:id", updateCourseById);
router.delete("/:id", deleteCourseById);

// Additional functionality
router.get("/category/:category", getCoursesByCategory);
router.get("/instructor/:instructorId", getCoursesByInstructor);
router.get("/search", searchCourses);
router.get("/pagination", getCoursesByPagination);
router.get("/recent", getRecentCourses);
router.get("/popular", getPopularCourses);

// Student actions
router.post("/:id/enroll", enrollInCourse);
router.post("/:id/unenroll", unenrollFromCourse);

// Ratings & reviews
router.post("/:id/rate", rateCourse);
router.post("/:id/review", reviewCourse);

// Media uploads
router.post("/:id/upload", uploadCourseMedia);

export default router;
