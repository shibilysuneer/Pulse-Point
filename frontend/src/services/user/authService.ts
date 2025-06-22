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