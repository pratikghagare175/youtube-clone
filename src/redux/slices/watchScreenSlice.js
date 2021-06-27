import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Axios";

export const fetchVideoById = createAsyncThunk(
  "yt_watchscreen/fetchVideoById",
  async ({ videoId }, { rejectWithValue }) => {
    try {
      const { data } = await axios("/videos", {
        params: {
          part: "snippet,statistics",
          id: videoId,
        },
      });

      return {
        video: data.items[0],
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const watchScreenSlice = createSlice({
  name: "yt_watchscreen",
  initialState: {
    loading: false,
    video: null,
  },
  extraReducers: {
    //? Thunk To Get Video by Id
    [fetchVideoById.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchVideoById.fulfilled]: (state, action) => {
      const { video } = action.payload;
      state.loading = false;
      state.video = video;
    },
    [fetchVideoById.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default watchScreenSlice.reducer;
