import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import homeVideosReducer from "./slices/homeVideosSlice";
import watchScreenReducer from "./slices/watchScreenSlice";
import searchScreenReducer from "./slices/searchScreenSlice";
import subscriptionReducer from "./slices/subscriptionSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    homeVideos: homeVideosReducer,
    watchScreen: watchScreenReducer,
    searchScreen: searchScreenReducer,
    subscriptionScreen: subscriptionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
