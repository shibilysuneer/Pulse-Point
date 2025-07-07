
import axios from "axios";
import { HttpStatus } from "../utils/httpStatus";
// import { store } from "../redux/store";
// import { refreshAccessToken } from "../redux/slices/admin/adminSlice";

let _refreshTokenHandler: (() => Promise<string | null>) | null = null;

// Function to set the refresh token handler
export const setAdminRefreshTokenHandler = (handler: () => Promise<string | null>) => {
  _refreshTokenHandler = handler;
};

const AdminAPI = axios.create({
    baseURL:import.meta.env.VITE_ADMIN_API_URL,
   
     headers: {
    "Content-Type": "application/json",
  },
   withCredentials:true,
})
// setupInterceptors(AdminAPI);

AdminAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    console.log("token-api:",token);
    
    console.log(" AdminAPI Interceptor- Attaching token:", token); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }else {
      console.warn("No token found in localStorage at request time!");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// AdminAPI.interceptors.response.use(
// (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//      if (error.response?.status === 401 && !(originalRequest as any)._retry) {
//       originalRequest._retry = true;
//     try {
//          const refreshResult = await store.dispatch(refreshAccessToken());
//         const newToken = refreshResult.payload;

//         if (refreshResult.meta.requestStatus === "fulfilled") {
//           localStorage.setItem("admin_token", newToken); // ⬅️ Save to localStorage
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return AdminAPI(originalRequest); // Retry with new token
//         } else {
//           throw new Error("Token refresh failed");
//         }
//     } catch (refreshError) {
//          console.error("Refresh token failed", refreshError);
//         localStorage.removeItem("admin_token"); // ⬅️ Optional: Clear token on failure
//         window.location.href = "/admin/login";
//         return Promise.reject(refreshError);
//     }
// }
//  return Promise.reject(error);

//   }
// );
// RESPONSE INTERCEPTOR
AdminAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === HttpStatus.UNAUTHORIZED && !_refreshTokenHandler) {
      console.error("No refresh token handler is set! Cannot refresh token.");
      window.location.href = "/admin/signin";
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call injected refresh handler
        const newToken = await _refreshTokenHandler?.();
        if (newToken) {
          localStorage.setItem("admin_token", newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return AdminAPI(originalRequest);
        } else {
          throw new Error("No new token received");
        }
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("admin_token");
        window.location.href = "/admin/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default AdminAPI;