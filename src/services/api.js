import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://job-manager-backend-tg0v.onrender.com"
});

export default api;