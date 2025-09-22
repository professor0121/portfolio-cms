import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/posts/create", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating post");
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  "post/fetchAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/posts");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching posts");
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "post/fetchPostById",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/posts/${postId}`);
      console.log("fetchPostById - response data:", res.data.data);
      return res.data.data; // expecting a single post object
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching post");
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    error: null,
    posts: [],
    post: null, // 👈 single post alag se
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // createPost
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Something went wrong";
      })

      // fetchAllPosts
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Something went wrong";
      })

      // fetchPostById
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload; // single post yaha store hoga
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Something went wrong";
      });
  },
});

export default postSlice.reducer;
