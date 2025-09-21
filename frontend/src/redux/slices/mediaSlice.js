import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";


// Async upload thunk
export const uploadMedia = createAsyncThunk(
  "media/upload",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axiosInstance.post("/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllMedia = createAsyncThunk(
  "media/fetchAll",
  async (_, { rejectWithValue }) => {   
    try {
      const { data } = await axiosInstance.get("/media/all");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState: { mediaList: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadMedia.pending, (state) => { state.loading = true; })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.mediaList.push(action.payload);
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        .addCase(getAllMedia.pending, (state) => { state.loading = true; })
        .addCase(getAllMedia.fulfilled, (state, action) => {
            state.loading = false;
            state.mediaList = action.payload;
            state.error = null;
        })
        .addCase(getAllMedia.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
  },
});

export default mediaSlice.reducer;
