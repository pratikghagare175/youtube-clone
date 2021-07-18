import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Axios";

export const fetchChannelVideos = createAsyncThunk(
  "yt_channelscreen/fetchChannelVideos",
  async ({ channelId }, { rejectWithValue }) => {
    try {
      //1. get upload playlistId using channelId
      const { data } = await axios("/channels", {
        params: {
          part: "contentDetails",
          id: channelId,
        },
      });

      const uploadPlaylistId = data.items[0].contentDetails.relatedPlaylists.uploads;

      //2. get channel videos using playlistId
      const { data: channelData } = await axios("/playlistItems", {
        params: {
          part: "snippet,contentDetails",
          playlistId: uploadPlaylistId,
          maxResults: 30,
        },
      });

      return {
        videos: channelData.items,
      };
    } catch (error) {
      console.log("🚀 ~ file: channelSlice.js ~ line 19 ~ error", error);
      return rejectWithValue(error);
    }
  }
);

const channelSlice = createSlice({
  name: "yt_channelscreen",
  initialState: {
    loading: null,
    playlist: [],
  },
  extraReducers: {
    //? Thunk To get Channels Videos
    [fetchChannelVideos.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchChannelVideos.fulfilled]: (state, action) => {
      const { videos } = action.payload;
      state.loading = false;
      state.playlist = videos;
    },
    [fetchChannelVideos.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default channelSlice.reducer;
