import React from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoBySearch } from "../../../redux/slices/searchScreenSlice";
import VideoHorizontal from "../../videoHorizontal/VideoHorizontal";
import SearchSkeleton from "../../skeleton/SearchSkeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "-2.5rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0",
    },
  },
}));

const SearchScreen = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchVideoBySearch({ query }));
  }, [dispatch, query]);

  const { videos, loading } = useSelector((state) => state.searchScreen);
  return (
    <div className={classes.root}>
      {!loading
        ? videos?.map((video) => <VideoHorizontal video={video} searchScreen />)
        : videos?.map((val, i) => <SearchSkeleton />)}
    </div>
  );
};

export default SearchScreen;
