import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularVideos, fetchVideoByCategory } from "../../../redux/slices/homeVideosSlice";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Video from "../../video/Video";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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

  const { videos, activeCategory } = useSelector((state) => state.homeVideos);
  const fetchData = () => {
    if (activeCategory === "All") dispatch(fetchPopularVideos());
    else dispatch(fetchVideoByCategory({ keyword: activeCategory }));
  };
  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchData}
          hasMore={true}
          // loader={<Box color="text.default"></Box>}
          style={{ overflow: "hidden" }}
        >
          <Grid container spacing={2}>
            {videos.map((video) => (
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
