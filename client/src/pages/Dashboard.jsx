import React, { useEffect, useState } from 'react'
import {
  FilePenLine,
  LoaderCircleIcon,
  Pencil,
  Plus,
  Trash,
  UploadCloud,
  X
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth)

  const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  /* ================= LOAD RESUMES ================= */
  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  /* ================= CREATE RESUME ================= */
  const createResume = async (event) => {
    event.preventDefault()
    try {
      const { data } = await api.post(
        '/api/resumes/create',
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  /* ================= UPLOAD RESUME (FIXED) ================= */
  const uploadResume = async (event) => {
    event.preventDefault()

    // 🔒 Frontend validation (NO UI CHANGE)
    if (!title.trim()) {
      toast.error('Resume title is required')
      return
    }

    if (!resume) {
      toast.error('Please select a resume PDF')
      return
    }

    setIsLoading(true)

    try {
      const resumeText = await pdfToText(resume)

      // 🔒 Prevent empty / broken PDF uploads
      if (!resumeText || resumeText.trim().length < 50) {
        throw new Error('Unable to read text from this PDF')
      }

      const { data } = await api.post(
        '/api/ai/upload-resume',
        { title, resumeText },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setTitle('')
      setResume(null)
      setShowUploadResume(false)

      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        'Failed to upload resume'
      )
    } finally {
      setIsLoading(false)
    }
  }

  /* ================= EDIT TITLE ================= */
  const editTitle = async (event) => {
    event.preventDefault()
    try {
      const { data } = await api.put(
        '/api/resumes/update',
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setAllResumes(allResumes.map(r =>
        r._id === editResumeId ? { ...r, title } : r
      ))

      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  /* ================= DELETE ================= */
  const deleteResume = async (resumeId) => {
    try {
      const confirmDelete = window.confirm(
        'Are you sure you want to delete this Resume?'
      )
      if (!confirmDelete) return

      const { data } = await api.delete(
        `/api/resumes/delete/${resumeId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setAllResumes(allResumes.filter(r => r._id !== resumeId))
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  /* ================= UI (UNCHANGED) ================= */
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <Plus className="size-11 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600">
              Create Resume
            </p>
          </button>

          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloud className="size-11 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length]

            return (
              <button
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg,${baseColor}10,${baseColor}40)`,
                  borderColor: baseColor + '40'
                }}
              >
                <FilePenLine className="size-7" style={{ color: baseColor }} />

                <p className="text-sm px-2 text-center" style={{ color: baseColor }}>
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] px-2 text-center"
                  style={{ color: baseColor + '90' }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div
                  onClick={e => e.stopPropagation()}
                  className="absolute top-1 right-1 hidden group-hover:flex"
                >
                  <Trash
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:bg-white/50 rounded"
                  />
                  <Pencil
                    onClick={() => {
                      setEditResumeId(resume._id)
                      setTitle(resume.title)
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded"
                  />
                </div>
              </button>
            )
          })}
        </div>

        {/* CREATE MODAL */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create A Resume</h2>

              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded">
                Create Resume
              </button>

              <X
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => {
                  setShowCreateResume(false)
                  setTitle('')
                }}
              />
            </div>
          </form>
        )}

        {/* UPLOAD MODAL */}
        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                type="text"
                placeholder="Enter Resume Title"
                className="w-full px-4 py-2 mb-4"
                required
              />

              <label className="block text-sm">
                <div className="border border-dashed p-6 my-4 text-center cursor-pointer">
                  {resume ? resume.name : 'Upload Resume'}
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  hidden
                  onChange={e => setResume(e.target.files[0])}
                />
              </label>

              <button
                disabled={isLoading}
                className="w-full py-2 bg-green-600 text-white rounded"
              >
                {isLoading ? 'Uploading…' : 'Upload Resume'}
              </button>

              <X
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => {
                  setShowUploadResume(false)
                  setTitle('')
                  setResume(null)
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Dashboard
