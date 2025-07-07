import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import type { GoogleLoginReq, LoginRequest, SignupHospitalRequest } from "../../../types/authTypes";
import { loginHospital,signupHospital,logoutHospital,
  sendOtpHospital,resendOtpHospital,
  verifyOtpHospital,verifyPasswordHospital,
  submitRegistrationDetailsHospital
 } from "../../../services/hospital/authService";
// import {auth,googleProvider} from '../../../config/firebase'
import { googleLoginHospital } from "../../../services/hospital/authService";

interface HospitalState {
  hospital: any;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: HospitalState = {
  hospital: null,
  loading: false,
  error: null,
  message: null,
};
export const hospitalLogin = createAsyncThunk(
  'hospital/login',
  async (data: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await loginHospital(data); // assume this returns { token, hospital }
      console.log("loginHospital response:", response);

    
      localStorage.setItem('hospital_token', response.accesstoken);
      localStorage.setItem('hospital_role', 'hospital');

      return response;
    } catch (error: any) {
      console.error("err", error);
      const message = error.response?.data?.error || "Login failed";
      return rejectWithValue(message);
    }
  }
);

export const hospitalSignup = createAsyncThunk(
  "hospital/signup",
  async (data: SignupHospitalRequest, { rejectWithValue }) => {
    try {
      const response = await signupHospital(data);
      console.log("signupHospital response:", response);
      localStorage.setItem('hospital_token', response.accesstoken);
      localStorage.setItem('hospital_role', 'hospital');
      return response;
    } catch (error: any) {
      console.error("err", error);
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);
export const hospitalLogout = createAsyncThunk(
  'hospital/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutHospital(); 
      localStorage.removeItem('hospital_token');
      localStorage.removeItem('hospital_role');
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const hospitalGoogleLogin = createAsyncThunk(
  'hospital/googleLogin',
  async (data: GoogleLoginReq, { rejectWithValue }) => {
    try {
      const response = await googleLoginHospital(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Google login failed');
    }
  }
);
export const sendOtp = createAsyncThunk(
  "hospital/sendOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await sendOtpHospital(email);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP");
    }
  }
);
export const resendOtp = createAsyncThunk(
  "hospital/resendOtp",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await resendOtpHospital(email);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to resend OTP");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "hospital/verifyOtp",
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await verifyOtpHospital(email, otp);
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "OTP verification failed");
    }
  }
);

export const verifyPassword = createAsyncThunk(
  "hospital/verifyPassword",
  async ({ email,otp, password }: { email: string;otp: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await verifyPasswordHospital(email,otp, password);
      return response
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Password reset failed");
    }
  }
);
export const submitRegistrationDetails = createAsyncThunk(
  "hospital/registerDetails",
  async (data: {
    // hospitalId: string;
    licenseNumber: string;
    website: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }, { rejectWithValue }) => {
    console.log("data-registra",data);
    
    try {
      const res = await submitRegistrationDetailsHospital(data);
      console.log("registra_res:",res);
      
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Submission failed");
    }
  }
);


const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hospitalLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(hospitalLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.hospital = action.payload;
        state.message = "Login successful";
      })
      .addCase(hospitalLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(hospitalSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(hospitalSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.hospital = action.payload;
        state.message = "Signup successful";
      })
      .addCase(hospitalSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })


      .addCase(hospitalGoogleLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(hospitalGoogleLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.hospital = action.payload;
      state.message = "Google login successful";
      localStorage.setItem("hospital_token", action.payload.token);
      localStorage.setItem("hospitalInfo", JSON.stringify(action.payload.hospital));
    })
    .addCase(hospitalGoogleLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(hospitalLogout.fulfilled, (state) => {
  state.hospital = null;
  state.message = "Logout successful";
  state.error = null;
})
.addCase(hospitalLogout.rejected, (state, action) => {
  state.error = action.payload as string;
})

    // Send OTP
.addCase(sendOtp.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(sendOtp.fulfilled, (state, action) => {
  state.loading = false;
  state.message = action.payload.message || "OTP sent";
})
.addCase(sendOtp.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})

// Resend OTP
.addCase(resendOtp.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(resendOtp.fulfilled, (state, action) => {
  state.loading = false;
  state.message = action.payload.message || "OTP resent";
})
.addCase(resendOtp.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})

// Verify OTP
.addCase(verifyOtp.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(verifyOtp.fulfilled, (state, action) => {
  state.loading = false;
  state.message = action.payload.message || "OTP verified";
})
.addCase(verifyOtp.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})

// Verify Password
.addCase(verifyPassword.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(verifyPassword.fulfilled, (state, action) => {
  state.loading = false;
  state.message = action.payload.message || "Password reset successful";
})
.addCase(verifyPassword.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})

.addCase(submitRegistrationDetails.fulfilled, (state, action) => {
  state.loading = false;
  state.hospital = action.payload;
  state.message = "Registration submitted";
})


  },
});

export default hospitalSlice.reducer;