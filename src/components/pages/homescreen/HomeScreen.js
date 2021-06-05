import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularVideos } from "../../../redux/slices/homeVideosSlice";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Video from "../../video/Video";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  card_grid: {
    flexGrow: 1,
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { videos } = useSelector((state) => state.homeVideos);

  useEffect(() => {
    dispatch(fetchPopularVideos());
  }, []);
  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={2}>
          {videos.map((video) => (
            <Grid item className={classes.card_grid} key={video.id}>
              <Video video={video} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomeScreen;
