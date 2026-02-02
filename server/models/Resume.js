import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      default: "Untitled Resume",
      trim: true,
    },

    public: {
      type: Boolean,
      default: false,
    },

    template: {
      type: String,
      default: "classic",
      enum: ["classic", "minimal", "minimal-image", "modern", "sidebar"],
    },

    accent_color: {
      type: String,
      default: "#3B82F6",
    },

    professional_summary: {
      type: String,
      default: "",
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    personal_info: {
      image: { type: String, default: "" },
      full_name: { type: String, default: "", trim: true },
      profession: { type: String, default: "", trim: true },
      email: { type: String, default: "", trim: true },
      phone: { type: String, default: "", trim: true },
      location: { type: String, default: "", trim: true },
      linkedin: { type: String, default: "", trim: true },
      website: { type: String, default: "", trim: true },
    },

    experience: {
      type: [
        {
          company: { type: String, default: "", trim: true },
          position: { type: String, default: "", trim: true },
          start_date: { type: String, default: "" },
          end_date: { type: String, default: "" },
          description: { type: String, default: "" },
          is_current: { type: Boolean, default: false },
        },
      ],
      default: [],
    },

    project: {
      type: [
        {
          name: { type: String, default: "", trim: true },
          type: { type: String, default: "", trim: true },
          description: { type: String, default: "" },
        },
      ],
      default: [],
    },

    education: {
      type: [
        {
          institution: { type: String, default: "", trim: true },
          degree: { type: String, default: "", trim: true },
          field: { type: String, default: "", trim: true },
          graduation_date: { type: String, default: "" },
          gpa: { type: String, default: "" },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Resume = mongoose.model("Resume", ResumeSchema);
export default Resume;
