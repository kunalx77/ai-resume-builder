# AI Resume Builder
React | Node.js | MongoDB | Gemini AI

AI Resume Builder is a full-stack web application that enables users to create, enhance, upload, and download professional resumes using artificial intelligence.
The platform focuses on clean design, ATS-friendly content, and real-world deployment practices.

Live Application:
https://ai-resume-builder-kx77.vercel.app/

---

## Project Overview

AI Resume Builder simplifies resume creation by combining modern web technologies with generative AI.
Users can either build resumes from scratch or upload existing PDF resumes, which are parsed into structured, editable formats.

The system is designed to be scalable, user-friendly, and production-ready, following real industry patterns for frontend, backend, AI integration, and deployment.

---

## Key Features

- JWT-based user authentication
- Create resumes from scratch
- AI-powered content enhancement
  - Professional summaries
  - Job descriptions
- Multiple resume templates
  - Modern
  - Classic
  - Minimal
  - Sidebar
  - Image-based layout
- Print-ready A4 resume download
- Cloud-based profile image upload
- Responsive UI for all screen sizes
- Secure API communication

---

## AI Capabilities

The application uses Google Gemini 2.5 Flash as the AI engine for:

- Enhancing resume content into concise, ATS-friendly language
- Improving clarity, tone, and professional impact

The AI integration avoids paid OpenAI dependencies.

---

## System Architecture

### Frontend
- React (Vite)
- Tailwind CSS
- Redux Toolkit
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

### AI Service
- Google Gemini API

### Cloud & Deployment
- Vercel – Frontend hosting
- Render – Backend hosting
- MongoDB Atlas – Database
- ImageKit – Image storage

---

## Future Improvements

- Resume version history
- More AI-powered suggestions
- ATS Score
- Resume sharing via public links
- PDF OCR fallback for scanned resumes
- Multi-language resume support

