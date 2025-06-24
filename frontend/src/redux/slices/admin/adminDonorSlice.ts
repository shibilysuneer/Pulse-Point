// redux/slices/admin/adminDonorSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { DonorFormData } from '../../../types/donorTypes';
import { getAllDonors } from '../../../services/admin/donorService';


interface DonorState {
  donors: DonorFormData[];
  loading: boolean;
  error: string | null;
}

const initialState: DonorState = {
  donors: [],
  loading: false,
  error: null,
};
export const fetchDonors = createAsyncThunk("admin/fetchDonors", async (_, thunkAPI) => {
  try {
    return await getAllDonors();
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch donors");
  }
});

const donorSlice = createSlice({
  name: "adminDonor",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDonors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonors.fulfilled, (state, action) => {
        state.donors = action.payload;
        state.loading = false;
      })
      .addCase(fetchDonors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default donorSlice.reducer;
