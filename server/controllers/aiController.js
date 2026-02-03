import newAi from "../configs/newAi.js";
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

    const response = await newAi.responses.create({
      model: "gpt-4.1-mini",
      input: `Rewrite this professional resume summary in 2–3 concise ATS-friendly sentences:\n${userContent}`,
    });

    const enhancedContent =
      response.output_text?.trim();

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
      model: process.env.OPENAI_MODEL,
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
      return res.status(400).json({
        message: "Resume text and title required",
      });
    }

    const response = await newAi.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an AI resume parser. Extract structured resume data and return ONLY valid JSON.",
        },
        {
          role: "user",
          content: resumeText,
        },
      ],
      response_format: { type: "json_object" },
    });

    const parsedData = JSON.parse(
      response.choices?.[0]?.message?.content || "{}"
    );

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
