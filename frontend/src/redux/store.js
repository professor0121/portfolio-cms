import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import healthReducer from "./slices/healthSlice";
import tagReducer from "./slices/tagSlice";
import categoriesReducer from "./slices/categoriesSlice";
import mediaReducer from "./slices/mediaSlice";
import postReducer from "./slices/postSlice";
import projectReducer from "./slices/projectSlice";
import commentReducer from "./slices/commentSlice";
import reviewReducer from "./slices/reviewSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    health: healthReducer,
    tags: tagReducer,
    categories: categoriesReducer,
    media: mediaReducer,
    post: postReducer,
    project: projectReducer,
    comments: commentReducer,
    reviews: reviewReducer,
  },
});

export default store;
