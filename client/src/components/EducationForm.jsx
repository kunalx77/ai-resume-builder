import React from "react";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

const EMPTY_EDUCATION = {
  institution: "",
  degree: "",
  field: "",
  graduation_date: "",
  gpa: "",
};

const EducationForm = ({ data = [], onChange }) => {
  const addEducation = () => {
    onChange([...data, { ...EMPTY_EDUCATION }]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = data.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <GraduationCap className="size-5" />
            Education
          </h3>
          <p className="text-sm text-gray-500">
            Add your education details
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1.5 text-sm
                     bg-purple-100 text-purple-700 rounded
                     hover:bg-purple-200 transition"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No education added yet</p>
          <p className="text-sm">
            Click <span className="font-medium">Add Education</span> to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-4"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-800">
                  Education #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Institution Name"
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-purple-400"
                />

                <input
                  type="text"
                  placeholder="Degree (e.g., Bachelors, Masters)"
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-purple-400"
                />

                <input
                  type="text"
                  placeholder="Field of Study"
                  value={education.field}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-purple-400"
                />

                <input
                  type="month"
                  value={education.graduation_date}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
              </div>

              <input
                type="text"
                placeholder="GPA (Optional)"
                value={education.gpa}
                onChange={(e) =>
                  updateEducation(index, "gpa", e.target.value)
                }
                className="px-3 py-2 text-sm border rounded w-full
                           focus:outline-none focus:ring-1 focus:ring-purple-400"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
