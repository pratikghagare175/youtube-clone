import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Axios";

export const fetchPopularVideos = createAsyncThunk(
  "youtube/fetchPopularVideos",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "IN",
          maxResults: 20,
          pageToken: getState().homeVideos.nextPageToken,
        },
      });
      return {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchVideoByCategory = createAsyncThunk(
  "youtube/fetchPopularVideos",
  async ({ keyword }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios("/search", {
        params: {
          part: "snippet",
          maxResults: 20,
          pageToken: getState().homeVideos.nextPageToken,
          q: keyword,
          type: "video",
        },
      });
      return {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const homeVideosSlice = createSlice({
  name: "youtube",
  initialState: {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: "All",
  },

  extraReducers: {
    //? Thunk To Get All Popular videos
    [fetchPopularVideos.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPopularVideos.fulfilled]: (state, action) => {
      const { videos, nextPageToken, category } = action.payload;
      state.loading = false;
      state.videos = state.activeCategory === category ? [...state.videos, ...videos] : videos;
      state.nextPageToken = nextPageToken;
    },
    [fetchPopularVideos.rejected]: (state, action) => {
      state.loading = false;
    },

    //? Thunk To Get Videos By Category
    [fetchVideoByCategory.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchVideoByCategory.fulfilled]: (state, action) => {
      const { videos, nextPageToken, category } = action.payload;
      state.loading = false;
      state.videos = state.activeCategory === category ? [...state.videos, ...videos] : videos;
      state.nextPageToken = nextPageToken;
      state.activeCategory = category;
    },
    [fetchVideoByCategory.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default homeVideosSlice.reducer;
