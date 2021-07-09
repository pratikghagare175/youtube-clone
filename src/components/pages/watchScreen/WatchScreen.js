import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import VideoMetaData from "../../videoMetaData/VideoMetaData";
import VideoHorizontal from "../../videoHorizontal/VideoHorizontal";
import Comments from "../../comments/Comments";
import { useParams } from "react-router-dom";
import { fetchRelatedVideos, fetchVideoById } from "../../../redux/slices/watchScreenSlice";
import RelatedVideoSkeleton from "../../videoSkeleton/HorizontalSkeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "-3rem",
  },
  card: {
    marginBottom: "2rem",
    marginRight: "1rem",
    [theme.breakpoints.down("xs")]: {
      marginRight: "0",
      marginBottom: "1rem",
      marginTop: "1.5rem",
    },
  },
  player: {
    height: "60vh",
    width: "100%",
    backgroundColor: "#353946",
    [theme.breakpoints.down("xs")]: {
      height: "25vh",
      width: "100%",
    },
  },
}));

const WatchScreen = () => {
  const classes = useStyles();
  const { videoId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVideoById({ videoId }));
    dispatch(fetchRelatedVideos({ videoId }));
  }, [dispatch, videoId]);

  const { video, loading, relatedVideosArr } = useSelector((state) => state.watchScreen);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} lg={8}>
          <Card className={classes.card}>
            <CardActionArea>
              {/* Pass the videoId to src attribute */}
              <CardMedia
                component="iframe"
                className={classes.player}
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                title={video?.snippet?.title}
                allowFullScreen
                width="100%"
                height="100%"
              />
            </CardActionArea>
          </Card>
          <VideoMetaData video={video} videoId={videoId} />

          <Grid item xs={12}>
            <Comments videoId={videoId} totalComments={video?.statistics?.commentCount} />
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4}>
          {!loading
            ? relatedVideosArr
                ?.filter((video) => video.snippet)
                .map((video) => <VideoHorizontal video={video} key={video.id.videoId} />)
            : relatedVideosArr
                .filter((video) => video.snippet)
                .map((video) => <RelatedVideoSkeleton key={video.id.videoId} />)}
        </Grid>
      </Grid>
    </div>
  );
};

export default WatchScreen;
