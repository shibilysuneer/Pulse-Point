import AdminAPI from "../../api/AdminAPI"
import type { SignupAdminRequest,LoginRequest } from "../../types/authTypes"


export const loginAdmin =async(data:LoginRequest)=>{
    const response =await AdminAPI.post("/login",data)
    return response.data;
}
export const signupAdmin = async(data:SignupAdminRequest)=>{
    const response =await AdminAPI.post("/signup",data,{
        headers:{
            "Content-Type":"application/json",
        },
    });
    return response.data;
}