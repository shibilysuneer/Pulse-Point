// import axios from "axios"
import AdminAPI from "../../api/AdminAPI"
import type { SignupAdminRequest,LoginRequest } from "../../types/authTypes"
// const AdminAPI = axios.create({
//     baseURL:import.meta.env.VITE_ADMIN_API_URL,
//     withCredentials:true,
// })

export const loginAdmin =async(data:LoginRequest)=>{
    const response =await AdminAPI.post("/login",data)
    return response.data;
}
export const signupAdmin = async(data:SignupAdminRequest)=>{
    const response =await AdminAPI.post("/signup",data)
    return response.data;
}