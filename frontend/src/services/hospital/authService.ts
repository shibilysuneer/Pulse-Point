import type { GoogleLoginReq,LoginRequest,SignupHospitalRequest } from "../../types/authTypes";
import HospitalAPI from "../../api/HospitalAPI";

export const loginHospital = async (data: LoginRequest) => {
  const response = await HospitalAPI.post("/login", data);
  console.log("res-loginhospital:", response);
 return response.data; 
  // const { accesstoken, hospital } = response.data;

  // if (accesstoken && hospital) {
  //   localStorage.setItem("hospital_token", accesstoken);
  //   localStorage.setItem("hospital_role", hospital.role); // assuming hospital has a role
  //   return hospital;
  // }

  // throw new Error("Invalid hospital login response");
};

export const signupHospital = async (data: SignupHospitalRequest) => {
  const response = await HospitalAPI.post("/signup", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("res-signuphospital:", response);

  // const { accesstoken, hospital } = response.data;

  // if (accesstoken && hospital) {
  //   localStorage.setItem("hospital_token", accesstoken);
  //   localStorage.setItem("hospital_role", hospital.role);
  //   return hospital;
  // }
return response.data;
  // throw new Error("Invalid hospital signup response");
};

// LOGOUT
export const logoutHospital = async () => {
  const response = await HospitalAPI.post("/logout");

  console.log("res-logout-hospital:", response);

  // // Clear token from local storage
  // localStorage.removeItem("hospital_token");
  // localStorage.removeItem("hospital_role");

  return response.data;
};
export const googleLoginHospital = async (data: GoogleLoginReq) => {
  const response = await HospitalAPI.post("/google-login", data);
  console.log("googleres:",response);
  
  return response.data;
};
export const sendOtpHospital = async(email:string) => {
  try {
    const response = await HospitalAPI.post("/send-otp", { email })
     console.log("response",response);
    return response.data; 
  } catch (error:any) {
    console.log("err",error);
  }
}
export const resendOtpHospital = async(email:string) => {
  try {
    const response = await HospitalAPI.post("/resend-otp", { email })
     console.log("response",response);
    return response.data; 
  } catch (error:any) {
    console.log("err",error);
  }
}
export const verifyOtpHospital = async(email:string, otp: string) => {
  try {
    const response = await HospitalAPI.post("/verify-otp", { email,otp })
     console.log("response:",response);
    return response.data; 
  } catch (error:any) {
    console.log("err",error);
  }
}
export const verifyPasswordHospital  = async(email:string, otp: string, password: string) => {
  try {
    const response = await HospitalAPI.post("/reset-password", {
      email,
      otp,
      newPassword:password,
    })
     console.log("response==",response);
    return response.data; 
  } catch (error:any) {
    console.log("err",error);
  }
}


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
