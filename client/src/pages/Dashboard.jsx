import React, { useEffect, useState } from "react";
import {
  FilePenLine,
  LoaderCircleIcon,
  Pencil,
  Plus,
  Trash,
  UploadCloud,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  /* ================= LOAD RESUMES ================= */
  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  /* ================= CREATE RESUME ================= */
  const createResume = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  /* ================= UPLOAD EXISTING RESUME (FIXED) ================= */
  const uploadResume = async (event) => {
    event.preventDefault();

    // 🔒 Frontend validations
    if (!title.trim()) {
      toast.error("Please enter resume title");
      return;
    }

    if (!resume) {
      toast.error("Please select a PDF resume file");
      return;
    }

    setIsLoading(true);

    try {
      // Extract text from PDF
      const resumeText = await pdfToText(resume);

      if (!resumeText || !resumeText.trim()) {
        toast.error("Could not read text from PDF");
        setIsLoading(false);
        return;
      }

      // Send to backend
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Resume uploaded successfully");

      setTitle("");
      setResume(null);
      setShowUploadResume(false);

      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to upload resume"
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= EDIT TITLE ================= */
  const editTitle = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.put(
        `/api/resumes/update`,
        { resumeId: editResumeId, resumeData: { title } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllResumes(
        allResumes.map((r) =>
          r._id === editResumeId ? { ...r, title } : r
        )
      );

      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  /* ================= DELETE RESUME ================= */
  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this Resume?"
      );
      if (!confirm) return;

      const { data } = await api.delete(
        `/api/resumes/delete/${resumeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllResumes(allResumes.filter((r) => r._id !== resumeId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-4">
        <button
          onClick={() => setShowCreateResume(true)}
          className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border border-dashed"
        >
          <Plus className="size-10" />
          <p>Create Resume</p>
        </button>

        <button
          onClick={() => setShowUploadResume(true)}
          className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border border-dashed"
        >
          <UploadCloud className="size-10" />
          <p>Upload Existing</p>
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          onClick={() => setShowUploadResume(false)}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg w-full max-w-sm"
          >
            <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Resume Title"
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />

            <label className="block mb-4 cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => setResume(e.target.files[0])}
              />
              <div className="border border-dashed p-6 text-center">
                {resume ? resume.name : "Select PDF Resume"}
              </div>
            </label>

            <button
              disabled={isLoading}
              className="w-full py-2 bg-green-600 text-white rounded"
            >
              {isLoading ? "Uploading..." : "Upload Resume"}
            </button>

            <X
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => {
                setShowUploadResume(false);
                setTitle("");
                setResume(null);
              }}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
