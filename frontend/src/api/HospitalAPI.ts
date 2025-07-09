import axios from 'axios'

const HospitalAPI = axios.create({
  baseURL: import.meta.env.VITE_HOSPITAL_API_URL, 
  withCredentials: true, 
});

HospitalAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("hospital_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
export default HospitalAPI;