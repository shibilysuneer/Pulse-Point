import AdminAPI from "../../api/AdminAPI"
import type {LoginRequest } from "../../types/authTypes"


export const loginAdmin =async(data:LoginRequest)=>{
    const response =await AdminAPI.post("/login",data)
     console.log("res-login", response);
      if (response.data){
        const { token,admin } = response.data.token;
        localStorage.setItem("admin_token", token);
        localStorage.setItem("admin_role", admin.role);
      }
    return response.data;
}


export const refreshAccessToken = async () => {
  const res = await AdminAPI.post("/refresh-token");
  console.log("refre-response",res);
  
  return res.data.accessToken;
};

export const logoutAdmin = async () => {
  const res = await AdminAPI.post("/logout");
  console.log("response",res);
  return res.data;
};

export const sendOTP = async (email: string) => {
  const res = await AdminAPI.post("/send-otp", { email });
    console.log("response-otp",res);
  return res.data;
};

export const resendOTP = async (email: string) => {
  const res = await AdminAPI.post("/resend-otp", { email });
    console.log("response-resend",res);
  return res.data;
};

export const verifyOTP = async (otp: string, email: string) => {
  const res = await AdminAPI.post("/verify-otp", { email, otp });
    console.log("response-verify",res);
  return res.data;
};

export const resetPassword = async (email: string, password: string) => {
  const res = await AdminAPI.post("/reset-password", { email, password });
    console.log("response-reset",res);
  return res.data;
};