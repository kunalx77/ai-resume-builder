import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-builder-backend-x24y.onrender.com",
  withCredentials: true,
});

export default api;
