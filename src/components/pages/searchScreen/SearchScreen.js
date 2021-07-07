import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoBySearch } from "../../../redux/slices/searchScreenSlice";
import VideoHorizontal from "../../videoHorizontal/VideoHorizontal";

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideoBySearch({ query }));
  }, [dispatch, query]);

  const { videos, loading } = useSelector((state) => state.searchScreen);
  return (
    <>
      {!loading ? (
        videos?.map((video) => <VideoHorizontal video={video} searchScreen />)
      ) : (
        <h2>Loading ...</h2>
      )}
    </>
  );
};

export default SearchScreen;
