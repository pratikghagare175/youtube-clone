import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Axios";

export const fetchSubscribedChannels = createAsyncThunk(
  "yt_subscriptionscreen/fetchSubscribedChannels",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios("/subscriptions", {
        params: {
          part: "snippet,contentDetails",
          mine: true,
          maxResults:10,
        },
        headers: {
          Authorization: `Bearer ${getState().auth.accessToken}`,
        },
      });

      return {
        channels:data.items,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const subscriptionSlice = createSlice({
  name: "yt_subscriptionscreen",
  initialState: {
    loading: false,
    subscriptions: [],
  },
  extraReducers: {
    //? Thunk To get Subscribed Channels
    [fetchSubscribedChannels.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSubscribedChannels.fulfilled]: (state, action) => {
      const { channels } = action.payload;
      state.loading = false;
      state.subscriptions = channels
    },
    [fetchSubscribedChannels.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default subscriptionSlice.reducer;