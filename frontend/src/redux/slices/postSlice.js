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
        try{
            const res=await axiosInstance.get("/posts");
            return res.data;
        }catch(err){
            return rejectWithValue(err.response?.data || "Error fetching posts");
        }
    }
);

const postSlice = createSlice({
    name: "post",
    initialState: {
        loading: false,
        error: null,
        posts: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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
                // normalize error as string
                if (typeof action.payload === "string") {
                    state.error = action.payload;
                } else if (action.payload?.message) {
                    state.error = action.payload.message;
                } else {
                    state.error = "Something went wrong";
                }
            })

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
                // normalize error as string
                if (typeof action.payload === "string") {
                    state.error = action.payload;
                } else if (action.payload?.message) {
                    state.error = action.payload.message;
                } else {
                    state.error = "Something went wrong";
                }
            });
    },
});

export default postSlice.reducer;
