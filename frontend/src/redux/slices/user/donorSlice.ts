import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitDonorForm,
  fetchMyDonorRequestService,
  cancelDonorRequestService 
} from "../../../services/user/donorService";
import type { DonorFormData } from "../../../types/donorTypes";

interface DonorState {
  loading: boolean;
  success: boolean;
  error: string | null;
  request: DonorFormData | null;
}
const initialState: DonorState = {
  loading: false,
  success: false,
  error: null,
  request: null,
};

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
export const fetchMyDonorRequest = createAsyncThunk(
  "donor/fetchMyDonorRequest",
  async (_, thunkAPI) => {
    try {
      return await fetchMyDonorRequestService();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error fetching donor requests");
    }
  }
);

export const cancelDonorRequest = createAsyncThunk(
  "donor/cancelDonorRequest",
  async (id: string, thunkAPI) => {
    try {
      return await cancelDonorRequestService(id);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error cancelling request");
    }
  }
);


const donorSlice = createSlice({
  name: "donor",
  initialState, 
  reducers: {
    resetDonorState: (state) => {
      state.success = false;
      state.error = null;
    },
      clearDonorRequest: (state) => {
    state.request = null;
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
      })
    //   // ✅ Fetch requests
     .addCase(fetchMyDonorRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyDonorRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.request = action.payload;
      })
      .addCase(fetchMyDonorRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch donor request";
      })

    // ✅ Cancel request
   .addCase(cancelDonorRequest.pending, (state) => {
    state.loading = true;
  })
  .addCase(cancelDonorRequest.fulfilled, (state) => {
    state.loading = false;
    state.success = true;
    state.request = null; // clear request on cancel
  })
  .addCase(cancelDonorRequest.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
  },
});

export const { resetDonorState ,clearDonorRequest } = donorSlice.actions;
export default donorSlice.reducer;
