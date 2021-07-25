import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Video from "../../video/Video";
import VideoSkeleton from "../../skeleton/VideoSkeleton";
import { fetchLikedVideos } from "../../../redux/slices/likedVideoSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
  },
  card_grid: {
    flexGrow: 1,
  },
}));

const LikedVideos = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLikedVideos());
  }, [dispatch]);

  const { videos, loading } = useSelector((state) => state.likedVideos);

  return (
    <>
      <Grid container spacing={2} className={classes.root}>
        {loading
          ? [...Array(20)].map((item, index) => (
              <Grid item xs={12} md={4} lg={3} className={classes.card_grid} key={index}>
                <VideoSkeleton />
              </Grid>
            ))
          : videos.map((video) => (
              <Grid item xs={12} md={4} lg={3} className={classes.card_grid} key={video.id}>
                <Video video={video} />
              </Grid>
            ))}
      </Grid>
    </>
  );
};

export default LikedVideos;
