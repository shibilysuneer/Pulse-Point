import type { GoogleLoginReq,LoginRequest,SignupHospitalRequest } from "../../types/authTypes";
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
export const googleLoginHospital = async (data: GoogleLoginReq) => {
  const response = await HospitalAPI.post("/google-login", data);
  console.log("googleres:",response);
  
  return response.data;
};
// export const hospitalGoogleLogin = createAsyncThunk(
//   'hospital/googleLogin',
//   async (data: GoogleLoginReq, { rejectWithValue }) => {
//     try {
//       const response = await googleLoginHospital(data);
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Google login failed');
//     }
//   }
// );
