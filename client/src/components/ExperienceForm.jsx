import React, { useState } from "react";
import { Brain, Briefcase, Loader2, Plus, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";

const EMPTY_EXPERIENCE = {
  company: "",
  position: "",
  start_date: "",
  end_date: "",
  description: "",
  is_current: false,
};

const ExperienceForm = ({ data = [], onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    onChange([...data, { ...EMPTY_EXPERIENCE }]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = data.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  };

  const generateDescription = async (index) => {
    const experience = data[index];

    if (!experience.position || !experience.company) {
      toast.error("Please add company and position first");
      return;
    }

    setGeneratingIndex(index);

    const prompt = `
    Enhance this job description for a resume.
    Position: ${experience.position}
    Company: ${experience.company}
    Current description: ${experience.description || "N/A"}
    `;

    try {
      const response = await api.post(
        "/api/ai/enhance-job-desc",
        { userContent: prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateExperience(
        index,
        "description",
        response.data.enhancedContent
      );

      toast.success("Description enhanced");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "AI generation failed"
      );
    } finally {
      setGeneratingIndex(-1);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Briefcase className="size-5" />
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your job experience
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1.5 text-sm
                     bg-purple-100 text-purple-700 rounded
                     hover:bg-purple-200 transition"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No experience added yet</p>
          <p className="text-sm">
            Click <span className="font-medium">Add Experience</span> to begin
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-4"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">
                  Experience #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded focus:ring-1 focus:ring-purple-400"
                />

                <input
                  type="text"
                  placeholder="Job Title"
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded focus:ring-1 focus:ring-purple-400"
                />

                <input
                  type="month"
                  value={experience.start_date}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded focus:ring-1 focus:ring-purple-400"
                />

                <input
                  type="month"
                  value={experience.end_date}
                  disabled={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded
                             disabled:bg-gray-100 focus:ring-1 focus:ring-purple-400"
                />
              </div>

              {/* Current Job */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>

                  <button
                    type="button"
                    disabled={
                      generatingIndex === index ||
                      !experience.position ||
                      !experience.company
                    }
                    onClick={() => generateDescription(index)}
                    className="flex items-center gap-1 px-2 py-1 text-xs
                               bg-purple-100 text-purple-700 rounded
                               hover:bg-purple-200 transition
                               disabled:opacity-50"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Brain className="w-3 h-3" />
                    )}
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  placeholder="Describe your responsibilities and achievements"
                  className="w-full px-3 py-2 text-sm border rounded resize-none
                             focus:ring-1 focus:ring-purple-400"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
