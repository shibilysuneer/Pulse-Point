import AdminAPI from "../api/AdminAPI";
import { store } from "../redux/store";
import { refreshAccessToken } from "../redux/slices/admin/adminSlice";

//  Request Interceptor — Attach token
AdminAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
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

AdminAPI.interceptors.response.use(
(response) => response,
  async (error) => {
    const originalRequest = error.config;
     if (error.response?.status === 401 && !(originalRequest as any)._retry) {
      originalRequest._retry = true;
    try {
         const refreshResult = await store.dispatch(refreshAccessToken());
        const newToken = refreshResult.payload;

        if (refreshResult.meta.requestStatus === "fulfilled") {
          localStorage.setItem("admin_token", newToken); // ⬅️ Save to localStorage
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return AdminAPI(originalRequest); // Retry with new token
        } else {
          throw new Error("Token refresh failed");
        }
    } catch (refreshError) {
         console.error("Refresh token failed", refreshError);
        localStorage.removeItem("admin_token"); // ⬅️ Optional: Clear token on failure
        window.location.href = "/admin/signin"; // Redirect to login
        return Promise.reject(refreshError);
    }
}
 return Promise.reject(error);

  }
);