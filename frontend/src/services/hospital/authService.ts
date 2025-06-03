import type { LoginRequest,SignupHospitalRequest } from "../../types/authTypes";
import HospitalAPI from "../../api/HospitalAPI";

export const loginHospital = async (data: LoginRequest) => {
  const response = await HospitalAPI.post("/login", data);
  return response.data;
};

export const signupHospital = async (data: SignupHospitalRequest) => {
  const response = await HospitalAPI.post("/signup", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
