import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";

import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";
import api from "../configs/api";

const Preview = () => {
  const { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    try {
      const { data } = await api.get(
        `/api/resumes/public/${resumeId}`
      );
      setResumeData(data.resume);
    } catch (error) {
      console.error(
        error?.response?.data?.message || error.message
      );
      setResumeData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, [resumeId]);

  if (isLoading) return <Loader />;

  return resumeData ? (
    <div className="bg-slate-100">
  <div className="max-w-3xl mx-auto">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes=" bg-white"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-center text-5xl text-slate-400 font-medium">
        Resume Not Found
      </p>

      <Link
        to="/"
        className="mt-6 bg-green-500 hover:bg-green-600
                   text-white rounded-full px-6 h-9
                   ring-offset-1 ring-1 ring-green-400
                   flex items-center transition-colors"
      >
        <ArrowLeftIcon className="mr-2 size-4" />
        Go to home page
      </Link>
    </div>
  );
};

export default Preview;
