import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import homeVideosReducer from "./slices/homeVideosSlice";
import watchScreenReducer from "./slices/watchScreenSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    homeVideos: homeVideosReducer,
    watchScreen: watchScreenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
