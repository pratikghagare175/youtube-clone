import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Axios";

export const fetchVideoBySearch = createAsyncThunk(
  "yt_searchscreen/fetchVideoBySearch",
  async ({ query }, { rejectWithValue }) => {
    try {
      const { data } = await axios("/search", {
        params: {
          part: "snippet",
          maxResults: 20,
          q: query,
          type: "video",
        },
      });
      return {
        videos: data.items,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const searchScreenSlice = createSlice({
  name: "yt_searchscreen",
  initialState: {
    loading: null,
    videos: [],
  },
  extraReducers: {
    //? Thunk created for getting videos on search
    [fetchVideoBySearch.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchVideoBySearch.fulfilled]: (state, action) => {
      const { videos } = action.payload;
      state.loading = false;
      state.videos = videos;
    },
    [fetchVideoBySearch.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default searchScreenSlice.reducer;
