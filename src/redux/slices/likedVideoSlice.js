import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Axios";


export const fetchLikedVideos = createAsyncThunk(
  "yt_likedVideosScreen/fetchLikedVideos",
  async (payload, { rejectWithValue, getState }) => {
     try {
       const { data } = await axios("/videos", {
         params: {
           part: "snippet,contentDetails",
           myRating:"like",
           maxResults: 20,
         },
         headers: {
           Authorization: `Bearer ${getState().auth.accessToken}`,
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

const LikedVideosSlice = createSlice({
  name: "yt_likedVideosScreen",
  initialState: {
    loading: false,
    videos: [],
  },
  extraReducers: {
    //? Thunk To Get Liked videos
    [fetchLikedVideos.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchLikedVideos.fulfilled]: (state, action) => {
      const { videos } = action.payload;
      state.loading = false;
      state.videos = videos;
    },
    [fetchLikedVideos.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default LikedVideosSlice.reducer