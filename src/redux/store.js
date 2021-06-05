import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import homeVideosReducer from "./slices/homeVideosSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    homeVideos: homeVideosReducer,
  },
});
