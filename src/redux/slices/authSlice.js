import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "firebase/app";
import authentication from "../../Firebase";

export const googleAuth = createAsyncThunk("auth/googleAuth", async (payload, { rejectWithValue }) => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
    const res = await authentication.signInWithPopup(provider);

    return {
      accessToken: res.credential.accessToken,
      user: {
        name: res.user.displayName,
        photoUrl: res.user.photoURL,
      },
    };
  } catch (error) {
    rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: sessionStorage.getItem("ytc-accessToken") || null,
    user: sessionStorage.getItem("ytc-user") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state, action) => {
      sessionStorage.removeItem("ytc-accessToken");
      sessionStorage.removeItem("ytc-user");
      state.accessToken = null;
      state.user = null;
    },
  },
  extraReducers: {
    [googleAuth.pending]: (state, action) => {
      state.loading = true;
    },
    [googleAuth.fulfilled]: (state, action) => {
      const { user, accessToken } = action.payload;
      state.loading = false;
      state.accessToken = accessToken;
      state.user = user;
      sessionStorage.setItem("ytc-accessToken", accessToken);
      sessionStorage.setItem("ytc-user", JSON.stringify(user));
    },
    [googleAuth.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
