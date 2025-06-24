// src/redux/slices/hospital/donorSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDonorRequests } from "../../../services/hospital/reqDonorService";

interface Donor {
  _id: string;
  username: string;
  bloodGroup: string;
  location: string;
  gender: string;
  status: string;
 
}

interface DonorState {
  donorRequests: Donor[];
  loading: boolean;
  error: string | null;
}

const initialState: DonorState = {
  donorRequests: [],
  loading: false,
  error: null,
};

export const fetchDonorRequests = createAsyncThunk(
  "donor/fetchDonorRequests",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getDonorRequests();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

const donorSlice = createSlice({
  name: "donor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonorRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDonorRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.donorRequests = action.payload;
      })
      .addCase(fetchDonorRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default donorSlice.reducer;
