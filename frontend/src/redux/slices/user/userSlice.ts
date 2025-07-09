import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, resendOTP, resetPassword, sendOTP, signupUser, verifyOTP } from "../../../services/user/authService";
import type { UserLoginRequest, UserSignupRequest } from "../../../types/authTypes";

interface UserState {
  user: any;
  loading: boolean;
  error: string | null;
  message: string | null;
  accessToken?: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  message: null,
  accessToken: null,
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (data: UserLoginRequest, { rejectWithValue }) => {
    try {
      const user = await loginUser(data);
      return user;
    } catch (error: any) {
      // return rejectWithValue(error.response?.data?.message || error.message);
      return rejectWithValue(error.response?.data?.error || error.message);

    }
  }
);

export const userSignup = createAsyncThunk(
  "user/signup",
  async (data: UserSignupRequest, { rejectWithValue }) => {
    try {
      const user = await signupUser(data);
      return user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const  userLogout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    await logoutUser();
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_role');
    return true;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const sendUserOTP = createAsyncThunk("admin/sendOTP", async (email: string, { rejectWithValue }) => {
  try {
    const response= await sendOTP(email);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const resendUserOTP = createAsyncThunk("admin/resendOTP", async (email: string, { rejectWithValue }) => {
  try {
    const response=await resendOTP(email);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const verifyUserOTP = createAsyncThunk("admin/verifyOTP", async ({ otp, email }: { otp: string; email: string }, { rejectWithValue }) => {
  try {
    const response= await verifyOTP(otp, email);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const resetUserPassword = createAsyncThunk("admin/resetPassword", async ({ email,  otp, newPassword }: { email: string; otp: string; newPassword: string }, { rejectWithValue }) => {
  try {
    const response=  await resetPassword(email, otp, newPassword);
    return response
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Add reducers for pending/fulfilled/rejected for both userLogin and userSignup here

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accesstoken;
        state.message = "Login successful";
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = "Signup successful";
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
       .addCase(userLogout.fulfilled, state => {
        state.user = null;
        state.accessToken = null;
        state.error = null;
        state.message = 'Logged out';
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(sendUserOTP.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(sendUserOTP.fulfilled, (state) => {
            state.loading = false;
            state.message = "OTP sent";
          })
          .addCase(sendUserOTP.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          })
            .addCase(resendUserOTP.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(resendUserOTP.fulfilled, (state) => {
            state.loading = false;
            state.message = "OTP resent";
          })
          .addCase(resendUserOTP.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          })
             .addCase(verifyUserOTP.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(verifyUserOTP.fulfilled, (state) => {
            state.loading = false;
            state.message = "OTP verified";
          })
          .addCase(verifyUserOTP.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          })
            // RESET PASSWORD
          .addCase(resetUserPassword.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(resetUserPassword.fulfilled, (state) => {
            state.loading = false;
            state.message = "Password reset successful";
          })
          .addCase(resetUserPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });
          
  },
});

export default userSlice.reducer;
