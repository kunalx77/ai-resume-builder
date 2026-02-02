import newAi, { AI_MODEL } from "../configs/newAi.js";
import Resume from "../models/Resume.js";

/* ----------------------------------------
   Enhance Professional Summary
   POST /api/ai/enhance-pro-sum
---------------------------------------- */
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent?.trim()) {
      return res.status(400).json({ message: "User content is required" });
    }

    const response = await newAi.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume writer. Enhance the given professional summary into 2–3 concise, ATS-friendly sentences highlighting skills, experience, and career goals. Return only the improved text.",
        },
        { role: "user", content: userContent },
      ],
    });

    const enhancedContent =
      response.choices?.[0]?.message?.content?.trim() || "";

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.error("AI Summary Error:", error);
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

    if (!userContent?.trim()) {
      return res.status(400).json({ message: "User content is required" });
    }

    const response = await newAi.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Improve the job description into 1–2 impactful, ATS-friendly sentences using action verbs and measurable achievements. Return only the text.",
        },
        { role: "user", content: userContent },
      ],
    });

    const enhancedContent =
      response.choices?.[0]?.message?.content?.trim() || "";

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    console.error("AI Job Desc Error:", error);
    return res
      .status(500)
      .json({ message: "Failed to enhance job description" });
  }
};

/* ----------------------------------------
   Upload Resume (PDF → AI → DB)
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
      return res.status(400).json({ message: "Resume text and title required" });
    }

    const systemPrompt =
      "You are an AI resume parser. Extract structured resume data and return ONLY valid JSON.";

    const userPrompt = `
Extract structured data from the resume below.
Return strictly valid JSON in this format (no markdown, no explanation):

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [],
  "project": [],
  "education": []
}

Resume:
${resumeText}
`;

    const response = await newAi.chat.completions.create({
      model: AI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    let parsedData;
    try {
      parsedData = JSON.parse(
        response.choices?.[0]?.message?.content || "{}"
      );
    } catch (err) {
      console.error("AI JSON Parse Error:", err);
      return res
        .status(500)
        .json({ message: "AI returned invalid resume data" });
    }

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    return res.status(201).json({ resumeId: newResume._id });
  } catch (error) {
    console.error("Upload Resume Error:", error);
    return res.status(500).json({ message: "Failed to upload resume" });
  }
};
