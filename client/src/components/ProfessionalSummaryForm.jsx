import React, { useState } from "react";
import { Brain, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

  const ProfessionalSummaryForm = ({
    data = "",
    onChange,
    setResumeData,
  }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    if (!data?.trim()) {
      toast.error("Please write a summary before enhancing");
      return;
    }

    try {
      setIsGenerating(true);

      const prompt = `Enhance this professional resume summary:\n"${data}"`;

      const response = await api.post(
        "/api/newAi/enhance-pro-sum",
        { userContent: prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedContent,
      }));

      toast.success("Summary enhanced successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to enhance summary"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Write a short summary highlighting your experience and strengths
          </p>
        </div>

        <button
        disabled={isGenerating}
        onClick={generateSummary}
        className="
        flex flex-col items-center justify-center
        w-16 h-12
        rounded-md
        bg-purple-100 text-purple-700
        hover:bg-purple-200
        transition-colors
        disabled:opacity-50
        "
        >
  {isGenerating ? (
    <Loader2 className="size-4 animate-spin" />
  ) : (
    <Brain className="size-4" />
  )}
  <span className="text-[10px] leading-none mt-0.5">
    Enhance
  </span>
</button>

      </div>

      {/* Textarea */}
      <div className="mt-4 space-y-2">
        <textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          placeholder="Example: Results-driven software engineer with 2+ years of experience building scalable web applications..."
          className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg
                     focus:ring-1 focus:ring-green-500 focus:border-green-500
                     outline-none transition resize-none"
        />

        <p className="text-xs text-gray-500 text-center max-w-md mx-auto">
          Tip: Keep it concise (3–4 sentences). Focus on skills, experience, and impact.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
