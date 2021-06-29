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

export const fetchChannelInfo = createAsyncThunk(
  "yt_watchscreen/fetchChannelInfo",
  async ({ channelId }, { rejectWithValue }) => {
    try {
      const { data } = await axios("/channels", {
        params: {
          part: "snippet,statistics,contentDetails",
          id: channelId,
        },
      });

      return {
        channel: data.items[0],
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
    channel: null,
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

    //? Thunk To Get Channel details
    [fetchChannelInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchChannelInfo.fulfilled]: (state, action) => {
      const { channel } = action.payload;
      state.loading = false;
      state.channel = channel;
    },
    [fetchChannelInfo.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default watchScreenSlice.reducer;
