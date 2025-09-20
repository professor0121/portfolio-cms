import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// Async Thunks

// Login
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      return response.data; // { user, token }
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Login failed" });
    }
  }
);

// Logout (optional server-side)
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response=await axiosInstance.post("/auth/logout");
      console.log(response);
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Logout failed" });
    }
  }
);

// Create User (admin action)
export const createUser = createAsyncThunk(
  "user/create",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users", userData);
      return response.data; // created user object
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to create user" });
    }
  }
);

// Update User (admin action)
export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/users/${id}`, userData);
      return response.data; // updated user object
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to update user" });
    }
  }
);

// Initial State
const initialState = {
  user: null,        // current logged in user
  users: [],         // all users for admin management
  token: null,
  loading: false,
  error: null,
};

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.users = [];
      state.loading = false;
      state.error = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token || action.payload.user.token;

        // Save token and role
        localStorage.setItem("token", state.token);
        localStorage.setItem("adminToken", state.token);
        localStorage.setItem("role", action.payload.user.role);
        localStorage.setItem("name", action.payload.user.name);
        localStorage.setItem("email", action.payload.user.email);
        if (action.payload.user.refreshToken)
          localStorage.setItem("admin_refresh_token", action.payload.user.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.users = [];
        localStorage.clear();
      })

      // Create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload); // add new user to list
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create user";
      })

      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // update user in users array
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update user";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
