import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from 'lucide-react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

import PersonalFormInfo from '../components/PersonalFormInfo'
import ResumePreview from '../components/ResumePreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import api from '../configs/api'

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '#3B82F6',
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/get/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    loadExistingResume()
  }, [])

  const saveResume = async () => {
  try {
    const formData = new FormData();
    formData.append("resumeId", resumeId);

    if (removeBackground) {
      formData.append("removeBackground", "yes");
    }

    const dataToSend = structuredClone(resumeData);
    const imageFile = dataToSend.personal_info?.image;

    if (imageFile instanceof File) {
      delete dataToSend.personal_info.image;
      formData.append("image", imageFile);
    }

    formData.append("resumeData", JSON.stringify(dataToSend));

    const { data } = await api.put("/api/resumes/update", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setResumeData(prev => ({
      ...prev,
      ...data.resume,
      personal_info: {
        ...prev.personal_info,
        ...data.resume.personal_info,
        image:
          data.resume.personal_info?.image ||
          prev.personal_info?.image ||
          null,
      },
    }));

    return data; 
  } catch (error) {
    throw error; 
  }
};


  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append('resumeId', resumeId)
      formData.append('resumeData', JSON.stringify({ public: !resumeData.public }))

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setResumeData(prev => ({ ...prev, public: !prev.public }))
      toast.success(data.message)
    } catch (error) {
      toast.error('Failed to update visibility')
    }
  }

  const handleShare = () => {
    const base = window.location.origin
    const url = `${base}/view/${resumeId}`
    navigator.share ? navigator.share({ url }) : alert('Share not supported')
  }

  const downloadResume = () => window.print()

  return (
    <div>
      {/* BACK */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link to="/app" className="inline-flex gap-2 items-center text-gray-500 hover:text-gray-700">
          <ArrowLeftIcon className="size-4" />
          Back To Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT FORM PANEL */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg border p-6">

              {/* PROGRESS BAR */}
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
                  style={{ width: `${(activeSectionIndex * 100) / (sections.length - 1)}%` }}
                />
              </div>

              {/* HEADER */}
              <div className="flex justify-between items-center mb-6 border-b pb-3">
                <div className="flex gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={template => setResumeData(p => ({ ...p, template }))}
                  />
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={color => setResumeData(p => ({ ...p, accent_color: color }))}
                  />
                </div>

                <div className="flex gap-2">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() => setActiveSectionIndex(i => Math.max(i - 1, 0))}
                      className="flex items-center gap-1 px-4 py-2 text-sm border rounded-full hover:bg-gray-50"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                  onClick={() =>
                    setActiveSectionIndex(i =>
                      Math.min(i + 1, sections.length - 1)
                    )
                  }
  disabled={activeSectionIndex === sections.length - 1}
  className="
    flex items-center gap-1 px-4 py-2 text-sm
    border border-green-300
    rounded-full
    text-green-600
    hover:bg-green-600 hover:text-white hover:border-green-600
    transition-all
    disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-green-600
  "
>
  Next
  <ChevronRight className="size-4" />
</button>

                </div>
              </div>

              {/* FORM CONTENT */}
              <div className="space-y-6">
                {activeSection.id === 'personal' && (
                  <PersonalFormInfo
                    data={resumeData.personal_info}
                    onChange={data => setResumeData(p => ({ ...p, personal_info: data }))}
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === 'summary' && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={data => setResumeData(p => ({ ...p, professional_summary: data }))}
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === 'experience' && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={data => setResumeData(p => ({ ...p, experience: data }))}
                  />
                )}

                {activeSection.id === 'education' && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={data => setResumeData(p => ({ ...p, education: data }))}
                  />
                )}

                {activeSection.id === 'projects' && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={data => setResumeData(p => ({ ...p, project: data }))}
                  />
                )}

                {activeSection.id === 'skills' && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={data => setResumeData(p => ({ ...p, skills: data }))}
                  />
                )}
              </div>

              <div className="flex justify-end mt-6">
                <button
  onClick={() => {
    toast.promise(saveResume(), {
      loading: "Saving Resume...",
      success: "Resume Saved!",
      error: "Failed to save resume",
    });
  }}
  className="
    flex items-center gap-2
    px-6 py-2
    text-sm font-medium
    rounded-full
    border border-green-300
    text-green-600
    hover:bg-green-600 hover:text-white hover:border-green-600
    transition-all
  "
>
  Save Changes
</button>

              </div>
            </div>
          </div>

          {/* RIGHT PREVIEW PANEL */}
          <div className="lg:col-span-7">
            <div className="flex justify-end gap-2 mb-4">
              {resumeData.public && (
                <button onClick={handleShare} className="px-4 py-2 text-xs border rounded-full hover:bg-gray-50">
                  <Share2Icon className="size-4 inline mr-1" />
                  Share
                </button>
              )}

              <button
  onClick={changeResumeVisibility}
  className="
    flex items-center gap-2
    px-4 py-2 text-xs
    rounded-full
    border border-purple-300
    text-purple-600
    hover:bg-purple-600 hover:text-white hover:border-purple-600
    transition-all
  "
>
  {resumeData.public ? (
    <EyeIcon className="size-4" />
  ) : (
    <EyeOffIcon className="size-4" />
  )}
  {resumeData.public ? 'Public' : 'Private'}
</button>


              <button
  onClick={downloadResume}
  className="
    flex items-center gap-2
    px-4 py-2 text-xs
    rounded-full
    border border-green-300
    text-green-600
    hover:bg-green-600 hover:text-white hover:border-green-600
    transition-all
  "
>
  <DownloadIcon className="size-4" />
  Download
</button>

            </div>

            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
