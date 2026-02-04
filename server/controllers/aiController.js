import geminiModel from "../configs/newAi.js";
import Resume from "../models/Resume.js";

/* ----------------------------------------
   Enhance Professional Summary
   POST /api/ai/enhance-pro-sum
---------------------------------------- */
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || !userContent.trim()) {
      return res.status(400).json({ message: "User content is required" });
    }

    const prompt = `
Rewrite the following professional resume summary into 2–3 concise, ATS-friendly sentences.
Focus on skills, experience, and impact.
Return ONLY the improved text.

Summary:
${userContent}
`;

    const result = await geminiModel.generateContent(prompt);

    const enhancedContent =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      result?.response?.text?.();

    if (!enhancedContent) {
      return res.status(500).json({ message: "AI returned empty response" });
    }

    return res.status(200).json({
      enhancedContent: enhancedContent.trim(),
    });
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return res.status(500).json({ message: "Failed to enhance summary" });
  }
};

/* ----------------------------------------
   Enhance Job Description
   POST /api/ai/enhance-job-desc
---------------------------------------- */
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent || !userContent.trim()) {
      return res.status(400).json({ message: "User content is required" });
    }

    const prompt = `
Improve the following job description into 1–2 impactful, ATS-friendly sentences.
Use strong action verbs and measurable achievements.
Return ONLY the improved text.

Description:
${userContent}
`;

    const result = await geminiModel.generateContent(prompt);

    const enhancedContent =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      result?.response?.text?.();

    if (!enhancedContent) {
      return res.status(500).json({ message: "AI returned empty response" });
    }

    return res.status(200).json({
      enhancedContent: enhancedContent.trim(),
    });
  } catch (error) {
    console.error("Gemini Job Desc Error:", error);
    return res
      .status(500)
      .json({ message: "Failed to enhance job description" });
  }
};

/* ----------------------------------------
   Upload Resume (TEXT → AI → DB)
   POST /api/ai/upload-resume
---------------------------------------- */
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!resumeText?.trim() || !title?.trim()) {
      return res.status(400).json({
        message: "Resume text and title are required",
      });
    }

    const prompt = `
You are an AI resume parser.
Extract structured resume data and return ONLY valid JSON.
Do NOT include explanations, markdown, or extra text.

Required JSON format:
{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": ""
  },
  "experience": [],
  "education": [],
  "project": []
}

Resume Text:
${resumeText}
`;

    const result = await geminiModel.generateContent(prompt);

    const rawText =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      result?.response?.text?.();

    if (!rawText) {
      return res.status(500).json({
        message: "AI returned empty resume data",
      });
    }

    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (err) {
      console.error("Gemini JSON Parse Error:", rawText);
      return res.status(500).json({
        message: "AI returned invalid resume JSON",
      });
    }

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    return res.status(201).json({
      resumeId: newResume._id,
    });
  } catch (error) {
    console.error("Upload Resume Error:", error);
    return res.status(500).json({ message: "Failed to upload resume" });
  }
};
