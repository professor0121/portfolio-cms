import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Async thunk to fetch server info
export const fetchServerInfo = createAsyncThunk(
  "server/fetchServerInfo",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/server-info");
      return response.data.serverInfo; // return the serverInfo object
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  serverInfo: null,
  loading: false,
  error: null,
};

const serverSlice = createSlice({
  name: "server",
  initialState,
  reducers: {
    resetServerInfo: (state) => {
      state.serverInfo = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServerInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServerInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.serverInfo = action.payload;
      })
      .addCase(fetchServerInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetServerInfo } = serverSlice.actions;

export default serverSlice.reducer;
