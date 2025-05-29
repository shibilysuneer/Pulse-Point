import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import type{ LoginRequest,SignupAdminRequest } from "../../../types/authTypes";
import { loginAdmin,signupAdmin } from "../../../services/admin/authService";

interface AdminState {
  admin: any;
  loading: boolean;
  error: string | null;
  message: string | null;
}
const initialState: AdminState = {
  admin: null,
  loading: false,
  error: null,
  message: null,
};
export const adminLogin = createAsyncThunk(
    "admin/login",
    async(data:LoginRequest,{rejectWithValue})=>{
        try {
            const response=await loginAdmin(data);
            return response;
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.message||"Login Failed")
        }
    }
);
export const adminSignup = createAsyncThunk(
  "admin/signup",
  async (data: SignupAdminRequest, { rejectWithValue }) => {
    try {
      const response = await signupAdmin(data);
      console.log("signupAdmin response:", response);
      return response;
    } catch (error: any) {
       console.error("err", error);
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);
const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
      
    },extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.message = "Login successful";
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(adminSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
        state.message = "Signup successful";
      })
      .addCase(adminSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
})
// export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;