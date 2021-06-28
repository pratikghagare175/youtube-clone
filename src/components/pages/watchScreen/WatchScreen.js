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
import { fetchVideoById } from "../../../redux/slices/watchScreenSlice";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: "2rem",
    marginRight: "1.5rem",
    [theme.breakpoints.down("md")]: {
      marginRight: "0",
      marginBottom: "1rem",
      marginTop: "1.5rem",
    },
  },
  player: {
    height: "60vh",
    width: "100%",
    backgroundColor: "#353946",
    [theme.breakpoints.down("md")]: {
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
    console.log("Use Effect Called");
  }, [dispatch, videoId]);

  const { video, loading } = useSelector((state) => state.watchScreen);

  return (
    <div style={{ marginTop: "-3rem" }}>
      <Grid container>
        <Grid item lg={8}>
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

          <Comments />
        </Grid>
        <Grid item lg={4}>
          {[...Array(20)].map((item, index) => (
            <VideoHorizontal key={index} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default WatchScreen;
