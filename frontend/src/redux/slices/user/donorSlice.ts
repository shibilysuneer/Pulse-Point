import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitDonorForm } from "../../../services/user/donorService";

export const createDonorRequest = createAsyncThunk(
  "donor/create",
  async (formData: any, thunkAPI) => {
    try {
      const response = await submitDonorForm(formData);
      console.log("res_donor",response);
      
      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

const donorSlice = createSlice({
  name: "donor",
  initialState: {
    loading: false,
    success: false,
    error: null as string | null,
  },
  reducers: {
    resetDonorState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDonorRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDonorRequest.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createDonorRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDonorState } = donorSlice.actions;
export default donorSlice.reducer;
