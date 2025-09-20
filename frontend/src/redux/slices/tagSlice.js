import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Async thunks
export const fetchTags = createAsyncThunk(
  "tags/fetchTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/tags");
      console.log(response.data)
      return response.data.data; // expecting array of tags
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching tags");
    }
  }
);

export const createTag = createAsyncThunk(
  "tags/createTag",
  async (tagData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/tags", tagData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error creating tag");
    }
  }
);

export const updateTag = createAsyncThunk(
  "tags/updateTag",
  async ({ id, tagData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/tags/${id}`, tagData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating tag");
    }
  }
);

export const deleteTag = createAsyncThunk(
  "tags/deleteTag",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/tags/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting tag");
    }
  }
);

// Slice
const tagSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetTags: (state) => {
      state.tags = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tags
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Tag
      .addCase(createTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tags.push(action.payload);
      })
      .addCase(createTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Tag
      .addCase(updateTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = state.tags.map((tag) =>
          tag.id === action.payload.id ? action.payload : tag
        );
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Tag
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = state.tags.filter((tag) => tag.id !== action.payload);
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTags } = tagSlice.actions;
export default tagSlice.reducer;
