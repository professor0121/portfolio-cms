import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import healthReducer from "./slices/healthSlice";
import tagReducer from "./slices/tagSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    health:healthReducer,
    tags:tagReducer,
  },
});

export default store;
