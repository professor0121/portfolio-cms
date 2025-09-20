import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Async thunk: fetch server health
export const fetchHealthStatus = createAsyncThunk(
  "health/fetchStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/health"); // API endpoint
      return response.data; // e.g., { status: 'ok', uptime: 12345 }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server error");
    }
  }
);

const initialState = {
  status: null, // e.g., 'ok' or 'error'
  uptime: null, // server uptime
  loading: false,
  error: null,
};

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    resetHealth: (state) => {
      state.status = null;
      state.uptime = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHealthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHealthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.uptime = action.payload.uptime;
      })
      .addCase(fetchHealthStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch health status";
      });
  },
});

export const { resetHealth } = healthSlice.actions;
export default healthSlice.reducer;
