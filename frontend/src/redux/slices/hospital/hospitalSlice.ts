import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import type { LoginRequest, SignupHospitalRequest } from "../../../types/authTypes";
import { loginHospital,signupHospital } from "../../../services/hospital/authService";

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
export const hospitalLogin= createAsyncThunk('hospital/login',
    async(data:LoginRequest,{rejectWithValue})=>{
        try {
            const response = await loginHospital(data)
             console.log("loginHospital response:", response);
      return response;
        } catch (error:any) {
          console.error("err", error);
      return rejectWithValue(error.response?.data?.message || "Login failed");  
        }
    }
)

export const hospitalSignup = createAsyncThunk(
  "hospital/signup",
  async (data: SignupHospitalRequest, { rejectWithValue }) => {
    try {
      const response = await signupHospital(data);
      console.log("signupHospital response:", response);
      return response;
    } catch (error: any) {
      console.error("err", error);
      return rejectWithValue(error.response?.data?.message || "Signup failed");
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
      });
  },
});

export default hospitalSlice.reducer;