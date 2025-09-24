import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Async Thunks
export const fetchAds = createAsyncThunk(
    "ads/fetchAds",

    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/ads");
            return response.data; // expecting array of ads
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching ads");
        }
    });

export const createAd = createAsyncThunk(
    "ads/createAd",
    async (adData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/ads", adData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error creating ad");
        }
    }
);

export const deleteAd = createAsyncThunk(
    "ads/deleteAd",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/ads/${id}`);
            return { id };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting ad");
        }
    }
);

const initialState = {
    ads: [],
    loading: false,
    error: null,
};

const adsSlice = createSlice({
    name: "ads",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAds.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(fetchAds.fulfilled, (state, action) => {
                state.loading = false;
                state.ads = action.payload;
            }   )
            .addCase(fetchAds.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }
            );  
        // Create Ad
        builder
            .addCase(createAd.pending, (state) => { 
                state.loading = true;
                state.error = null;
            })
            .addCase(createAd.fulfilled, (state, action) => {
                state.loading = false;
                state.ads.push(action.payload);
            })
            .addCase(createAd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete Ad
        builder
            .addCase(deleteAd.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAd.fulfilled, (state, action) => {
                state.loading = false;
                state.ads = state.ads.filter(
                    (ad) => ad._id !== action.payload.id
                );
            })
            .addCase(deleteAd.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adsSlice.reducer;    