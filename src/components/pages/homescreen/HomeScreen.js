import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularVideos, fetchVideoByCategory } from "../../../redux/slices/homeVideosSlice";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Video from "../../video/Video";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoSkeleton from "../../videoSkeleton/VideoSkeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignContent:"center",
    width:"100%"
  },
  card_grid: {
    flexGrow: 1,
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularVideos());
  }, [dispatch]);

  const { videos, activeCategory, loading } = useSelector((state) => state.homeVideos);
  const fetchData = () => {
    if (activeCategory === "All") dispatch(fetchPopularVideos());
    else dispatch(fetchVideoByCategory({ keyword: activeCategory }));
  };
  return (
    <>
      <Container maxWidth="lg" >
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchData}
          hasMore={true}
          // loader={<Box color="text.default"></Box>}
          style={{ overflow: "hidden" }}
        >
          <Grid container spacing={2} className={classes.root}>
            {loading
              ? [...Array(20)].map((item, index) => (
                  <Grid item xs={3} className={classes.card_grid} key={index}>
                    <VideoSkeleton />
                  </Grid>
                ))
              : videos.map((video) => (
                  <Grid item className={classes.card_grid} key={video.id}>
                    <Video video={video} />
                  </Grid>
                ))}
          </Grid>
        </InfiniteScroll>
      </Container>
    </>
  );
};

export default HomeScreen;
