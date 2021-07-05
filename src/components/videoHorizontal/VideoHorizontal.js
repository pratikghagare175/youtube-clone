import React, { useState, useEffect } from "react";
import moment from "moment";
import numeral from "numeral";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import axios from "../../Axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 450,
    maxHeight: 300,
    background: "#16181B",
    transition: "0.3s",
    marginBottom: "1rem",
    boxShadow: "0 2px 20px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 8px 50px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "65%",
  },

  heading: {
    fontWeight: "bold",
  },
  duration: {
    position: "absolute",
    fontSize: "0.7rem",
    textAlign: "center",
    bottom: "0.6rem",
    opacity: "0.9",
    right: "0.5rem",
    padding: "0.2rem",
    backgroundColor: "#080808",
    borderRadius: "3px",
  },
  video_title: {
    fontWeight: "bold",
    color: "#fff",
  },
}));

const VideoHorizontal = ({ video }) => {
  const classes = useStyles();
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const history = useHistory();

  //? Desctructuring related video to get channel and video related data
  const channelId = video.snippet.channelId;
  const videoId = video.id.videoId;
  const channelTitle = video.snippet.channelTitle;
  const videoTitle = video.snippet.title;
  const videoDescription = video.snippet.description;
  const publishedAt = video.snippet.publishedAt;
  const videoBanner = video.snippet.thumbnails?.medium.url;

  //? To get Video details like views and time
  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await axios("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };

    getVideoDetails();
  }, [videoId]);

  //? To get Channel details like channel Icon
  useEffect(() => {
    const getChannelDetails = async () => {
      const {
        data: { items },
      } = await axios("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.medium.url);
    };

    getChannelDetails();
  }, [channelId]);

  //? To Calculate Video Duration
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const handleVideoClick = () => {
    history.push(`/watch/${videoId}`);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card} onClick={handleVideoClick}>
        <Grid container>
          <Grid item xs={4} md={4}>
            <div style={{ position: "relative", width: "120px" }}>
              <CardMedia
                className={classes.media}
                component={() => (
                  <LazyLoadImage effect="blur" src={videoBanner} style={{ width: "100%" }} />
                )}
              ></CardMedia>
              <span className={classes.duration}>{_duration}</span>
            </div>
          </Grid>
          <Grid item xs={8} md={8}>
            <div style={{ marginLeft: "0.2rem", marginTop: "0.3rem" }}>
              <Tooltip title={videoTitle} TransitionComponent={Zoom} placement="bottom-end">
                <Typography variant="body2" noWrap className={classes.video_title}>
                  {videoTitle}
                </Typography>
              </Tooltip>

              <Typography variant="caption" noWrap style={{ display: "block" }}>
                {channelTitle}
              </Typography>
              <Typography variant="caption">
                {numeral(views).format("0.aa").toUpperCase()} views • {moment(publishedAt).fromNow()}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default VideoHorizontal;
