import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import authReducer from "./slices/authSlice";
import homeVideosReducer from "./slices/homeVideosSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    homeVideos: homeVideosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
