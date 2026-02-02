import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

/* ----------------------------------------
   Create Resume
   POST /api/resumes/create
---------------------------------------- */
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newResume = await Resume.create({ userId, title });

    return res.status(201).json({
      message: "Resume Created Successfully",
      resume: newResume,
    });
  } catch (error) {
    console.error("Create Resume Error:", error);
    return res.status(500).json({ message: "Failed to create resume" });
  }
};

/* ----------------------------------------
   Delete Resume
   DELETE /api/resumes/delete/:resumeId
---------------------------------------- */
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const deleted = await Resume.findOneAndDelete({
      _id: resumeId,
      userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ message: "Resume Deleted Successfully" });
  } catch (error) {
    console.error("Delete Resume Error:", error);
    return res.status(500).json({ message: "Failed to delete resume" });
  }
};

/* ----------------------------------------
   Get Resume (Private)
   GET /api/resumes/get/:resumeId
---------------------------------------- */
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId, userId }).lean();

    if (!resume) {
      return res.status(404).json({ message: "Resume Not Found" });
    }

    delete resume.__v;
    delete resume.createdAt;
    delete resume.updatedAt;

    return res.status(200).json({ resume });
  } catch (error) {
    console.error("Get Resume Error:", error);
    return res.status(500).json({ message: "Failed to fetch resume" });
  }
};

/* ----------------------------------------
   Get Resume (Public)
   GET /api/resumes/public/:resumeId
---------------------------------------- */
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      _id: resumeId,
      public: true,
    }).lean();

    if (!resume) {
      return res.status(404).json({ message: "Resume Not Found" });
    }

    delete resume.userId;
    delete resume.__v;
    delete resume.createdAt;
    delete resume.updatedAt;

    return res.status(200).json({ resume });
  } catch (error) {
    console.error("Public Resume Error:", error);
    return res.status(500).json({ message: "Failed to fetch resume" });
  }
};

/* ----------------------------------------
   Update Resume
   PUT /api/resumes/update
---------------------------------------- */
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID required" });
    }

    // Parse resumeData safely
    let dataToUpdate =
      typeof resumeData === "string"
        ? JSON.parse(resumeData)
        : JSON.parse(JSON.stringify(resumeData));

    // Handle image upload
    if (image) {
      const uploadResponse = await imageKit.files.upload({
        file: fs.createReadStream(image.path),
        fileName: `resume-${Date.now()}.png`,
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });

      dataToUpdate.personal_info = {
        ...dataToUpdate.personal_info,
        image: uploadResponse.url,
      };

      // cleanup temp file
      fs.unlink(image.path, () => {});
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      dataToUpdate,
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Saved Successfully",
      resume: updatedResume,
    });
  } catch (error) {
    console.error("Update Resume Error:", error);
    return res.status(500).json({ message: "Failed to update resume" });
  }
};
