import { GoogleGenerativeAI } from "@google/generative-ai";

/* ----------------------------------------
   Gemini AI Configuration
---------------------------------------- */
if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️ GEMINI_API_KEY not configured. AI features disabled.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Gemini 2.5 Flash 
 */
const geminiModel = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
});

export default geminiModel;
