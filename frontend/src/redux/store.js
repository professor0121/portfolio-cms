import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import healthReducer from "./slices/healthSlice";
import tagReducer from "./slices/tagSlice";
import categoriesReducer from "./slices/categoriesSlice";
import mediaReducer from "./slices/mediaSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    health: healthReducer,
    tags: tagReducer,
    categories: categoriesReducer,
    media: mediaReducer,
  },
});

export default store;
