import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoBySearch } from "../../../redux/slices/searchScreenSlice";

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideoBySearch({ query }));
  }, [dispatch, query]);
  return (
    <div>
      <h1>{query}</h1>
    </div>
  );
};

export default SearchScreen;
