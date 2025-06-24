// redux/slices/admin/adminDonorSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { DonorFormData } from '../../../types/donorTypes';
import { getAllDonors,toggleDonorsStatus} from '../../../services/admin/donorService';


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
export const fetchAdminDonors = createAsyncThunk("admin/fetchDonors", async (_, thunkAPI) => {
  try {
    return await getAllDonors();
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch donors");
  }
});
export const toggleDonorStatus = createAsyncThunk(
  "admin/toggleDonorStatus",
  async ({ id, status }: { id: string; status: string }, thunkAPI) => {
    try {
      const updatedDonor = await toggleDonorsStatus(id, status);
      return updatedDonor;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update status");
    }
  }
);


const donorSlice = createSlice({
  name: "adminDonor",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAdminDonors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDonors.fulfilled, (state, action) => {
        state.donors = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdminDonors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleDonorStatus.fulfilled, (state, action) => {
  const updated = action.payload;
  const index = state.donors.findIndex(d => d._id === updated._id);
  if (index !== -1) {
    state.donors[index].status = updated.status;
  }
})
.addCase(toggleDonorStatus.rejected, (state, action) => {
  state.error = action.payload as string;
});
  },
});

export default donorSlice.reducer;
