import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, signupUser } from "../../../services/user/authService";
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
      return rejectWithValue(error.response?.data?.message || error.message);
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
export const userLogout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    await logoutUser();
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_role');
    return true;
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
        state.user = action.payload;
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
      });
  },
});

export default userSlice.reducer;
