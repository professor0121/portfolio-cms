import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// ========================
// Async Thunks
// ========================

// Fetch all projects
export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/projects");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching projects");
    }
  }
);

// Fetch single project by ID
export const fetchProjectById = createAsyncThunk(
  "project/fetchProjectById",
  async (projectId, { rejectWithValue }) => {
    try {
      console.log("response", projectId);
      const res = await axiosInstance.get(`/projects/${projectId}`);
      console.log("responsedi",res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching project");
    }
  }
);

// Create a new project
export const createProject = createAsyncThunk(
  "project/createProject",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/projects/create", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating project");
    }
  }
);

// Update a project by ID
export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ projectId, formData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/projects/${projectId}`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating project");
    }
  }
);

// Delete a project by ID
export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/projects/${projectId}`);
      return { id: projectId, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error deleting project");
    }
  }
);

// Search projects
export const searchProjects = createAsyncThunk(
  "project/searchProjects",
  async (query, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/projects/search?q=${query}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error searching projects");
    }
  }
);

// ========================
// Initial State
// ========================
const initialState = {
  loading: false,
  error: null,
  projects: [],
  project: null, // single project
  successMessage: null,
};

// ========================
// Slice
// ========================
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    clearProjectState: (state) => {
      state.project = null;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single project
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Error fetching project";
      })


      // Create project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
        state.successMessage = "Project created successfully";
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.map((proj) =>
          proj._id === action.payload._id ? action.payload : proj
        );
        state.successMessage = "Project updated successfully";
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter((proj) => proj._id !== action.payload.id);
        state.successMessage = action.payload.message;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search projects
      .addCase(searchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(searchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProjectState } = projectSlice.actions;
export default projectSlice.reducer;
