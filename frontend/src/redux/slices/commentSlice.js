import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Async Thunks
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ type, typeId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/comments/${type}/${typeId}`);
      return response.data; // assuming API returns array of comments
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching comments");
    }
  }
);


export const createComment = createAsyncThunk(
    "comments/createComment",
    async (commentData, { rejectWithValue }) => {
        try {   
            const response = await axiosInstance.post("/comments", commentData);
            console.log("Created Comment Response:", response.data);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || "Error creating comment");
        }
    }
);
export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/comments/${id}`);
            return { id };
        }
        catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting comment");
        }
    }
);



const initialState = {
    comments: [],
    loading: false,
    error: null,
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase("comments/fetchComments/pending", (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase("comments/fetchComments/fulfilled", (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase("comments/fetchComments/rejected", (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // Create Comment
        builder
            .addCase("comments/createComment/pending", (state) => { 
                state.loading = true;
                state.error = null;
            })
            .addCase("comments/createComment/fulfilled", (state, action) => {
                state.loading = false;
                state.comments.push(action.payload);
            })
            .addCase("comments/createComment/rejected", (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        //delete comment
        builder
            .addCase("comments/deleteComment/pending", (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase("comments/deleteComment/fulfilled", (state, action) => {
                state.loading = false;
                state.comments = state.comments.filter(
                    (comment) => comment._id !== action.payload.id
                );
            })
            .addCase("comments/deleteComment/rejected", (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }); 
    }
});

export default commentSlice.reducer;