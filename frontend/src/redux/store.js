import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import healthReducer from "./slices/healthSlice";
import tagReducer from "./slices/tagSlice";
import categoriesReducer from "./slices/categoriesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    health: healthReducer,
    tags: tagReducer,
    categories: categoriesReducer,
  },
});

export default store;
