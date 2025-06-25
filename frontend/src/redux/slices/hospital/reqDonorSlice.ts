// src/redux/slices/hospital/donorSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDonorById, getDonorRequests, hoToggleDonorBlockService, updateDonorStatus } from "../../../services/hospital/reqDonorService";
import type { DonorFormData as Donor } from "../../../types/donorTypes" 

interface DonorState {
  donorRequests: Donor[];
  selectedDonor: Donor | null;
  loading: boolean;
  error: string | null;
}

const initialState: DonorState = {
  donorRequests: [],
  selectedDonor: null,
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
export const fetchSingleDonor = createAsyncThunk(
  "donor/fetchSingleDonor",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getDonorById(id);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch donor");
    }
  }
);
export const changeDonorStatus = createAsyncThunk(
  "donor/changeDonorStatus",
  async (
    { id, status }: { id: string; status: "approved" | "rejected" },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateDonorStatus(id, status);
       console.log("data",data);
      return { id, status };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Status update failed");
    }
  }
);
export const hosToggleDonorBlock = createAsyncThunk(
  "hospital/toggleDonorBlock",
  async ({ id, isBlocked }: { id: string; isBlocked: boolean }, thunkAPI) => {
    try {
      return await hoToggleDonorBlockService(id, isBlocked);
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Failed to toggle donor block status");
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
      })
       // Fetch Single Donor
      .addCase(fetchSingleDonor.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedDonor = null;
      })
      .addCase(fetchSingleDonor.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDonor = action.payload;
      })
      .addCase(fetchSingleDonor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.selectedDonor = null;
      })
      .addCase(changeDonorStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const donor = state.donorRequests.find((d) => d._id === id);
        if (donor) {
          donor.status = status;
        }
      })
      .addCase(hosToggleDonorBlock.fulfilled, (state, action) => {
  const updated = action.payload;
  const index = state.donorRequests.findIndex(d => d._id === updated._id);
  if (index !== -1) {
    state.donorRequests[index].isBlocked = updated.isBlocked;
  }
})

      //change
      
    //   .addCase(changeDonorStatus.fulfilled, (state, action) => {
    //     const { id, status } = action.payload;

    //     // Update in list
    //     const donor = state.donorRequests.find((d) => d._id === id);
    //     if (donor) donor.status = status;

    //     // Update if selected
    //     if (state.selectedDonor?._id === id) {
    //       state.selectedDonor.status = status;
    //     }
    //   })
    //   .addCase(changeDonorStatus.rejected, (state, action) => {
    //     state.error = action.payload as string;
    //   });
  },
});

export default donorSlice.reducer;
