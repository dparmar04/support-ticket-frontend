import axios from 'axios';
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});


let hasShownSessionToast = false;


// 🔐 Attach token on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// 🚨 Handle expired session globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("🔥 AXIOS INTERCEPTOR HIT", error.response);

    const statusCode = error.response?.status;
    const message = error.response?.data?.message;

    if (
      !hasShownSessionToast &&
      (
        statusCode === 401 ||
        (statusCode === 400 && message === "Token is not valid")
      )
    ) {
      hasShownSessionToast = true;

      toast.error("Session expired. Please login again.");

      localStorage.clear();

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }

    return Promise.reject(error);
  }
);

export default api;
