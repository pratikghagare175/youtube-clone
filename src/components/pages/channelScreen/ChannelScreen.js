import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Video from "../../video/Video";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelVideos } from "../../../redux/slices/channelSlice";
import VideoSkeleton from "../../skeleton/VideoSkeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    flex: "1 1 0",
  },
  card_grid: {
    flexGrow: 1,
  },
}));

const ChannelScreen = () => {
  //This is a two step process
  // First we need the playlistId of the channel.
  // Using this playlistId we can then fetch the channel's playlist videos
  const classes = useStyles();
  const dispatch = useDispatch();
  const { channelId } = useParams();

  useEffect(() => {
    dispatch(fetchChannelVideos({ channelId }));
  }, [channelId, dispatch]);

  const { playlist, loading } = useSelector((state) => state.channelScreen);

  return (
    <>
      <Container>
        <Grid container>
          {!loading
            ? playlist.map((video) => (
                <Grid item xs={12} md={4} lg={3} key={video.id} className={classes.card_grid}>
                  <Video video={video} channelScreen />
                </Grid>
              ))
            : [...Array(20)].map((item, index) => (
                <Grid item xs={12} md={4} lg={3} className={classes.card_grid} key={index}>
                  <VideoSkeleton />
                </Grid>
              ))}
        </Grid>
      </Container>
    </>
  );
};

export default ChannelScreen;
