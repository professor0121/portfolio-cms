import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

const initialState = {
  likes: [],
  loading: false,
  error: null,
  likeCount: 0,
};

// 1. Like a target
export const likePost = createAsyncThunk(
  "likes/likePost",
  async ({ targetId, targetModel }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/likes/like", { targetId, targetModel });
      return data.data; // returns created like
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to like");
    }
  }
);

// 2. Unlike a target
export const unlikePost = createAsyncThunk(
  "likes/unlikePost",
  async ({ targetId, targetModel }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/likes/unlike", { targetId, targetModel });
      return data.data; // returns deleted like
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to unlike");
    }
  }
);

// 3. Fetch all likes for a target
export const fetchLikes = createAsyncThunk(
  "likes/fetchLikes",
  async ({ targetId, targetModel }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/likes/${targetModel}/${targetId}`);
      return data.data; // array of likes
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch likes");
    }
  }
);

// 4. Fetch like count for a target
export const fetchLikeCount = createAsyncThunk(
  "likes/fetchLikeCount",
  async ({ targetId, targetModel }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/likes/${targetModel}/${targetId}/count`);
      return data.count;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch like count");
    }
  }
);

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    resetLikes: (state) => {
      state.likes = [];
      state.loading = false;
      state.error = null;
      state.likeCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Like
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;
        state.likes.push(action.payload);
        state.likeCount += 1;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Unlike
      .addCase(unlikePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = state.likes.filter((like) => like._id !== action.payload._id);
        state.likeCount = Math.max(0, state.likeCount - 1);
      })
      .addCase(unlikePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Likes
      .addCase(fetchLikes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.likes = action.payload;
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Like Count
      .addCase(fetchLikeCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikeCount.fulfilled, (state, action) => {
        state.loading = false;
        state.likeCount = action.payload;
      })
      .addCase(fetchLikeCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetLikes } = likeSlice.actions;
export default likeSlice.reducer;
