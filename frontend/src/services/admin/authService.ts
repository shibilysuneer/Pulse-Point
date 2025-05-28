import axios from "axios"
import type { SignupAdminRequest,LoginRequest } from "../../types/authTypes"
const API = axios.create({
    baseURL:"/api/admin",
    withCredentials:true,
})

export const loginAdmin =async(data:LoginRequest)=>{
    const response =await API.post("/login",data)
    return response.data;
}
export const signupAdmin = async(data:SignupAdminRequest)=>{
    const response =await API.post("/signup",data)
    return response.data;
}