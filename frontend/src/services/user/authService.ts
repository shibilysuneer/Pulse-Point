import UserAPI from "../../api/UserAPI";
import type { UserLoginRequest, UserSignupRequest } from "../../types/authTypes";

export const loginUser = async (data: UserLoginRequest) => {
  const response = await UserAPI.post("/login", data);
    console.log("res-loginuser:",response);
  const { accesstoken, user } = response.data;

  if (accesstoken && user) {
    localStorage.setItem("user_token", accesstoken);
    localStorage.setItem("user_role", user.role);
    return user;
  }

  throw new Error("Invalid login response");
};

export const signupUser = async (data: UserSignupRequest) => {
  const response = await UserAPI.post("/signup", data);
  console.log("res-signupuser:",response);
  
  const { accesstoken, user } = response.data;

  if (accesstoken && user) {
    localStorage.setItem("user_token", accesstoken);
    localStorage.setItem("user_role", user.role);
    return user;
  }

  throw new Error("Invalid signup response");
};
export const logoutUser = async () => {
  const response = await UserAPI.post('/logout');
  console.log("res-logout:",response);
  
  return response.data;
};

export const sendOTP = async (email: string) => {
  const res = await UserAPI.post("/send-otp", { email });
    console.log("response-otp",res);
  return res.data;
};

export const resendOTP = async (email: string) => {
  const res = await UserAPI.post("/resend-otp", { email });
    console.log("response-resend",res);
  return res.data;
};

export const verifyOTP = async (otp: string, email: string) => {
  const res = await UserAPI.post("/verify-otp", { email, otp });
    console.log("response-verify",res);
  return res.data;
};

export const resetPassword = async (email: string,otp: string, newPassword: string) => {
  const res = await UserAPI.post("/reset-password", { email, otp, newPassword });
    console.log("response-reset",res);
  return res.data;
};