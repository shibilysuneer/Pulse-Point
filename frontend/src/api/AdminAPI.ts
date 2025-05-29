
import axios from "axios";

const AdminAPI = axios.create({
    baseURL:import.meta.env.VITE_ADMIN_API_URL,
    withCredentials:true,
})

// 🔐 Request Interceptor — Attach token
// AdminAPI.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("adminToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
// AdminAPI.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.warn("Unauthorized — Redirecting or Logging out...");
//       // Optionally: redirect to login or dispatch logout
//     }
//     return Promise.reject(error);
//   }
// );
export default AdminAPI;