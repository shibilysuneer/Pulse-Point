
import axios from "axios";

const AdminAPI = axios.create({
    baseURL:import.meta.env.VITE_ADMIN_API_URL,
   
     headers: {
    "Content-Type": "application/json",
  },
   withCredentials:true,
})

export default AdminAPI;