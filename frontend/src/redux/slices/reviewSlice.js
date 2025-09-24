import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Async Thunks
export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async ({ type, typeId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/reviews/${type}/${typeId}`);
            return response.data; // assuming API returns array of reviews
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createReview = createAsyncThunk(
    "reviews/createReview",
    async (reviewData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/reviews", reviewData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error creating review");
        }
    }
);


export const deleteReview = createAsyncThunk(
    "reviews/deleteReview",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/reviews/${id}`);
            return { id };
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    reviews: [],
    loading: false,
    error: null,
};

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase("reviews/fetchReviews/pending", (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase("reviews/fetchReviews/fulfilled", (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase("reviews/fetchReviews/rejected", (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // Create Review
        builder
            .addCase("reviews/createReview/pending", (state) => {   
                state.loading = true;
                state.error = null;
            })
            .addCase("reviews/createReview/fulfilled", (state, action) => {
                state.loading = false;
                state.reviews.push(action.payload);
            })
            .addCase("reviews/createReview/rejected", (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // Delete Review
        builder
            .addCase("reviews/deleteReview/pending", (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase("reviews/deleteReview/fulfilled", (state, action) => {
                state.loading = false;
                state.reviews = state.reviews.filter(
                    (review) => review._id !== action.payload.id
                );
            })
            .addCase("reviews/deleteReview/rejected", (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default reviewSlice.reducer;