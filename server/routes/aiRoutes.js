import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controllers/aiController.js";

const aiRouter = express.Router();

/**
 * AI – Enhance professional summary
 * POST /api/ai/enhance-pro-sum
 */
aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);

/**
 * AI – Enhance job description
 * POST /api/ai/enhance-job-desc
 */
aiRouter.post("/enhance-job-desc", protect, enhanceJobDescription);

/**
 * AI – Upload & parse resume (PDF → JSON)
 * POST /api/ai/upload-resume
 */
aiRouter.post("/upload-resume", protect, uploadResume);

export default aiRouter;
