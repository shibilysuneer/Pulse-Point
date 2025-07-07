// redux/slices/admin/adminDonorSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { DonorFormData } from '../../../types/donorTypes';
import { getAllDonors,
    getDonorById,
    // toggleDonorsStatus
    toggleDonorBlockService,
} from '../../../services/admin/donorService';
import type { PaginationPayload } from '../../../types/commonTypes';


interface DonorState {
  donors: DonorFormData[];
  selectedDonor: DonorFormData | null;
  loading: boolean;
  error: string | null;
  total:number
}

const initialState: DonorState = {
  donors: [],
   selectedDonor: null,
  loading: false,
  error: null,
  total: 0,
};
export const fetchAdminDonors = createAsyncThunk("admin/fetchDonors", async ({ page, limit,search }: PaginationPayload, thunkAPI) => {
  try {
    return await getAllDonors({ page, limit,search });
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch donors");
  }
});

export const adToggleDonorBlock = createAsyncThunk(
  "admin/toggleDonorBlock",
  async (
    { donorId, isBlocked }: { donorId: string; isBlocked: boolean },
    thunkAPI
  ) => {
    try {
      const response = await toggleDonorBlockService(donorId, isBlocked);
      return response; // updated donor
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to toggle donor status."
      );
    }
  }
);
export const fetchSingleDonorByAdmin = createAsyncThunk(
  "admin/fetchSingleDonor",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getDonorById(id); // make sure this function exists
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch donor");
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
        state.donors = action.payload.donors;
         state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchAdminDonors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(adToggleDonorBlock.fulfilled, (state, action) => {
  const updated = action.payload;
  const index = state.donors.findIndex(d => d._id === updated._id);
  if (index !== -1) {
    state.donors[index].isBlocked  = updated.isBlocked ;
  }
})
.addCase(adToggleDonorBlock.rejected, (state, action) => {
  state.error = action.payload as string;
})
.addCase(fetchSingleDonorByAdmin.pending, (state) => {
  state.loading = true;
  state.selectedDonor = null;
})
.addCase(fetchSingleDonorByAdmin.fulfilled, (state, action) => {
  state.loading = false;
  state.selectedDonor = action.payload;
})
.addCase(fetchSingleDonorByAdmin.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
  state.selectedDonor = null;
})

  },
});

export default donorSlice.reducer;
