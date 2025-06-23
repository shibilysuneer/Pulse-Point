

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchHospitalsService,
  toggleHospitalBlockService,
//   updateHospitalService,
} from "../../../services/admin/hospitalService"
import type { PaginationPayload } from "../../../types/commonTypes";
import type { Hospital } from "../../../types/hospitalType";

interface AdminHospitalState {
  loading: boolean;
  error: string | null;
  success: boolean;
  hospitals: Hospital[];
  total: number;
}

const initialState: AdminHospitalState = {
  loading: false,
  error: null,
  success: false,
  hospitals: [],
  total: 0,
};

// ✅ Fetch hospitals
export const fetchHospitals = createAsyncThunk(
  "admin/fetchHospitals",
  async ({ page = 1, limit = 10, search = ""  }: PaginationPayload, { rejectWithValue }) => {
    try {
      const response = await fetchHospitalsService({ page, limit, search });
      return response; // Should return { hospitals: [...], total: number }
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

// ✅ Update hospital info
// export const updateHospital = createAsyncThunk(
//   "adminHospital/updateHospital",
//   async (hospital: UpdateHospitalRequest, { rejectWithValue }) => {
//     try {
//       const response = await updateHospitalService(hospital);
//       return response; // updated hospital
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || "Failed to update hospital.");
//     }
//   }
// );

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

      // updateHospital
    //   .addCase(updateHospital.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateHospital.fulfilled, (state, action) => {
    //     state.loading = false;
    //     const updated = action.payload;
    //     const index = state.hospitals.findIndex(h => h._id === updated._id);
    //     if (index !== -1) {
    //       state.hospitals[index] = updated;
    //     }
    //   })
    //   .addCase(updateHospital.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });
  },
});

export default adminHospitalSlice.reducer;
