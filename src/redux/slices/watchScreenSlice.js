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

export const checkSubscriptionStatus = createAsyncThunk(
  "yt_watchscreen/checkSubscriptionStatus",
  async ({ channelId }, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios("/subscriptions", {
        params: {
          part: "snippet",
          forChannelId: channelId,
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });

      return {
        status: data.items.length !== 0,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchVideoComments = createAsyncThunk(
  "yt_watchscreen/fetchVideoComments",
  async ({ videoId }, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios("/commentThreads", {
        params: {
          part: "snippet",
          videoId,
        },
      });

      return {
        data: data.items,
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
    subscriptionStatus: false,
    comments: [],
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

    //? Thunk To get Subscription Status
    [checkSubscriptionStatus.pending]: (state, action) => {
      state.loading = true;
    },
    [checkSubscriptionStatus.fulfilled]: (state, action) => {
      const { status } = action.payload;
      state.loading = false;
      state.subscriptionStatus = status;
    },
    [checkSubscriptionStatus.rejected]: (state, action) => {
      state.loading = false;
    },

    //? Thunk To get Subscription Status
    [fetchVideoComments.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchVideoComments.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.loading = false;
      state.comments = data;
    },
    [fetchVideoComments.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default watchScreenSlice.reducer;
