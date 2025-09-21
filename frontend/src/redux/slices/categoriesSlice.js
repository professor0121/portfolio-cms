import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Async Thunks
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/categories");
            return response.data.data; // expecting array of categories
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching categories");
        }
    })

export const createCategory = createAsyncThunk(
    "categories/createCategory",
    async (categoryData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/categories/create", categoryData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error creating category");
        }
    }
);
export const deleteCategory = createAsyncThunk(
    "categories/deleteCategory",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/categories/${id}`);
            return { id };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting category");
        }
    }
);
const initialState = {
    categories: [],
    loading: false,
    error: null,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Create Category
        builder
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories.push(action.payload);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //delete category
        builder
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = state.categories.filter(
                    (category) => category._id !== action.payload.id
                );
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default categoriesSlice.reducer;
