

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchHospitalsService,
  getHospitalByIdService,
  getPendingHospitals,
  toggleHospitalBlockService,
  updateHospitalStatusService,
} from "../../../services/admin/hospitalService"
import type { PaginationPayload } from "../../../types/commonTypes";
import type { Hospital } from "../../../types/hospitalType";

interface AdminHospitalState {
  loading: boolean;
  error: string | null;
  success: boolean;
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  total: number;
}

const initialState: AdminHospitalState = {
  loading: false,
  error: null,
  success: false,
  hospitals: [],
  selectedHospital: null,
  total: 0,
};
// ✅ Pending Fetch hospitals
export const fetchPendingHospitals = createAsyncThunk(
  "admin/fetchPendingHospitals",
  async ({ page = 1, limit = 10, search = "" }: PaginationPayload, { rejectWithValue }) => {
    try {
      const res = await getPendingHospitals({ page, limit, search });
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Failed to fetch");
    }
  }
);
// ✅ Fetch hospitals
export const fetchHospitals = createAsyncThunk(
  "admin/fetchHospitals",
  async ({ page = 1, limit = 10, search = "" ,status }: PaginationPayload, { rejectWithValue }) => {
    try {
      const response = await fetchHospitalsService({ page, limit, search,status });
      console.log("respos-fetchhosp",response);
      
      return response; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch hospitals.");
    }
  }
);

// ✅ Toggle hospital block/unblock
export const toggleHospitalBlock = createAsyncThunk(
  "admin/toggleHospitalBlock",
  async ({ hospitalId, isBlocked }: { hospitalId: string; isBlocked: boolean }, thunkAPI) => {
    try {
      const response = await toggleHospitalBlockService(hospitalId, isBlocked);
      return response; // updated hospital
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to toggle status.");
    }
  }
);

export const fetchHospitalById = createAsyncThunk(
  "admin/fetchHospitalById",
  async (hospitalId: string, { rejectWithValue }) => {
    try {
      const response = await getHospitalByIdService(hospitalId);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch hospital."
      );
    }
  }
);
export const updateHospitalStatus = createAsyncThunk(
  "admin/updateHospitalStatus",
  async (
    { hospitalId, newStatus }: { hospitalId: string; newStatus: "approved" | "rejected" },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateHospitalStatusService(hospitalId, newStatus);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to update status");
    }
  }
);



// ✅ Slice
const adminHospitalSlice = createSlice({
  name: "adminHospital",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchHospitals
      .addCase(fetchHospitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitals = action.payload.hospitals;
        state.total = action.payload.total;
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // toggleHospitalBlock
      .addCase(toggleHospitalBlock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleHospitalBlock.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.hospitals.findIndex(h => h._id === updated._id);
        if (index !== -1) {
          state.hospitals[index] = updated;
        }
      })
      .addCase(toggleHospitalBlock.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPendingHospitals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitals = action.payload.hospitals;
        state.total = action.payload.total;
      })
      .addCase(fetchPendingHospitals.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchHospitalById.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchHospitalById.fulfilled, (state, action) => {
  state.loading = false;
  state.selectedHospital = action.payload;
})
.addCase(fetchHospitalById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})
.addCase(updateHospitalStatus.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateHospitalStatus.fulfilled, (state, action) => {
  state.loading = false;
  state.selectedHospital = action.payload;
})
.addCase(updateHospitalStatus.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload as string;
})

  },
});

export default adminHospitalSlice.reducer;
