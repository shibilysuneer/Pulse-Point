import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import type{ LoginRequest} from "../../../types/authTypes";
import { loginAdmin , resendOTP, resetPassword, sendOTP, verifyOTP ,adminLogout, getRefreshAccessToken} from "../../../services/admin/authService";

interface AdminState {
  admin: any;
  loading: boolean;
  error: string | null;
  message: string | null;
  accessToken?: string | null;
}
const initialState: AdminState = {
  admin: null,
  loading: false,
  error: null,
  message: null,
  accessToken: null,
};
export const adminLogin = createAsyncThunk(
    "admin/login",
    async(data:LoginRequest,{rejectWithValue})=>{
        try {
            const  { accesstoken, admin }  =await loginAdmin(data);
            console.log("loginAdmin response:", admin );
            return  { accesstoken, admin }  ;
        } catch (error:any) {
          console.error("err", error);
                const message = error.response?.data?.error || error.message || 'Login failed';
            return rejectWithValue(message)
        }
    }
);
export const refreshAccessToken = createAsyncThunk("admin/refreshToken", async (_, { rejectWithValue }) => {
  try {
    const response  = await getRefreshAccessToken();
     return response.token;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const logoutAdmin = createAsyncThunk("admin/logout", async (_, { rejectWithValue }) => {
  try {
    await adminLogout(); 
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_role"); 
    return true;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const sendAdminOTP = createAsyncThunk("admin/sendOTP", async (email: string, { rejectWithValue }) => {
  try {
    const response= await sendOTP(email);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const resendAdminOTP = createAsyncThunk("admin/resendOTP", async (email: string, { rejectWithValue }) => {
  try {
    const response=await resendOTP(email);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const verifyAdminOTP = createAsyncThunk("admin/verifyOTP", async ({ otp, email }: { otp: string; email: string }, { rejectWithValue }) => {
  try {
    const response= await verifyOTP(otp, email);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const resetAdminPassword = createAsyncThunk("admin/resetPassword", async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response=  await resetPassword(email, password);
    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const adminSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
      
    },extraReducers: (builder) => {
    builder
//     .addCase(refreshAccessToken.fulfilled, (state, action) => {
//   localStorage.setItem("admin_token", action.payload);
//   state.token = action.payload;
// })
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
          const { accesstoken, admin } = action.payload;
        state.loading = false;
        state.admin = admin;
        state.accessToken = accesstoken;
        state.message = "Login successful";
          if (accesstoken) {
        
  }
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.error = action.payload as string;
        state.accessToken = null;
        state.admin = null; 
       })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.admin = null;
        state.accessToken = null;
        state.error = null;
        state.message = "Logged out";
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.message = "Logout failed";
       })
      .addCase(sendAdminOTP.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(sendAdminOTP.fulfilled, (state) => {
      state.loading = false;
      state.message = "OTP sent";
    })
    .addCase(sendAdminOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
      .addCase(resendAdminOTP.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(resendAdminOTP.fulfilled, (state) => {
      state.loading = false;
      state.message = "OTP resent";
    })
    .addCase(resendAdminOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
       .addCase(verifyAdminOTP.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(verifyAdminOTP.fulfilled, (state) => {
      state.loading = false;
      state.message = "OTP verified";
    })
    .addCase(verifyAdminOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
      // RESET PASSWORD
    .addCase(resetAdminPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(resetAdminPassword.fulfilled, (state) => {
      state.loading = false;
      state.message = "Password reset successful";
    })
    .addCase(resetAdminPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
     
  },
})
// export const { logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;