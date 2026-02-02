import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from "../controllers/resumeController.js";
import upload from "../configs/multer.js";

const resumeRouter = express.Router();

/**
 * Create a new resume
 * POST /api/resumes/create
 */
resumeRouter.post("/create", protect, createResume);

/**
 * Update resume (with optional image upload)
 * PUT /api/resumes/update
 */
resumeRouter.put(
  "/update",
  protect,                 
  upload.single("image"),  
  updateResume
);

/**
 * Delete resume
 * DELETE /api/resumes/delete/:resumeId
 */
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);

/**
 * Get resume by ID (private)
 * GET /api/resumes/get/:resumeId
 */
resumeRouter.get("/get/:resumeId", protect, getResumeById);

/**
 * Get resume by ID (public view)
 * GET /api/resumes/public/:resumeId
 */
resumeRouter.get("/public/:resumeId", getPublicResumeById);

export default resumeRouter;
