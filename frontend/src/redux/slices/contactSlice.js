// redux/contactSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// ========================
// Async Thunks
// ========================

// 1️⃣ Create contact
export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (contactData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/contact", contactData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create contact");
    }
  }
);

// 2️⃣ Get all contacts
export const getAllContacts = createAsyncThunk(
  "contacts/getAllContacts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/contact");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch contacts");
    }
  }
);

// 3️⃣ Get contact by ID
export const getContactById = createAsyncThunk(
  "contacts/getContactById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/contact/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch contact");
    }
  }
);

// 4️⃣ Update contact status
export const updateContactStatus = createAsyncThunk(
  "contacts/updateContactStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/contact/${id}`, { status });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update status");
    }
  }
);

// 5️⃣ Delete contact
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(`/contact/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete contact");
    }
  }
);

// ========================
// Slice
// ========================
const initialState = {
  contacts: [],
  contact: null,
  loading: false,
  success: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.contact = null;
    },
  },
  extraReducers: (builder) => {
    // Create contact
    builder
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contacts.push(action.payload);
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get all contacts
    builder
      .addCase(getAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Get contact by ID
    builder
      .addCase(getContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.contact = action.payload;
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update contact status
    builder
      .addCase(updateContactStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.contacts.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.contacts[index] = action.payload;
        if (state.contact?._id === action.payload._id) state.contact = action.payload;
      })
      .addCase(updateContactStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete contact
    builder
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contacts = state.contacts.filter(c => c._id !== action.payload._id);
        if (state.contact?._id === action.payload._id) state.contact = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;
