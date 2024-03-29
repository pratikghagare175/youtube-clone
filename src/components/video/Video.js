import React, { useState, useEffect } from "react";
import moment from "moment";
import numeral from "numeral";
import axios from "../../Axios";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 245,
    maxHeight: 260,
    background: "#16181B",
    transition: "0.3s",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 20px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 8px 50px -12.125px rgba(0,0,0,0.3)",
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: 280,
      width: "100%",
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
    textAlign: "center",
    bottom: "0.6rem",
    opacity: "0.9",
    right: "0.5rem",
    padding: "0.2rem",
    backgroundColor: "#080808",
    borderRadius: "3px",
  },

  channelName: {
    fontWeight: 400,
    fontSize: "0.9rem",
  },
}));

//https://i.ytimg.com/vi/bmVKaAV_7-A/hq720_live.jpg?sqp=CNjf1IUG-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAn49C9HjMqhp8iyQLJ1kCeHMvNuA
const Video = ({ video,channelScreen }) => {
  const classes = useStyles();

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const history = useHistory();

  const {
    id,
    snippet: {
      publishedAt,
      channelId,
      channelTitle,
      title,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const _videoId = id?.videoId || contentDetails?.videoId || id;

  //? To get Video details like views and time
  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await axios("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };

    getVideoDetails();
  }, [_videoId]);

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

  const handleVideoClick = () => {
    history.push(`/watch/${_videoId}`);
  };

  return (
    <div>
      <Card className={classes.card} onClick={handleVideoClick}>
        <div style={{ position: "relative" }}>
          <CardMedia
            className={classes.media}
            component={() => <LazyLoadImage effect="blur" src={medium.url} style={{ width: "100%" }} />}
          ></CardMedia>
          <span className={classes.duration}>{_duration}</span>
        </div>

        <CardContent>
          <Grid container spacing={0}>
            {!channelScreen && (
              <Grid item xs={3} md={4} lg={3}>
                <Avatar key="hi" src={channelIcon} />
              </Grid>
            )}

            <Grid
              item
              xs={channelScreen ? 12 : 9}
              md={channelScreen ? 12 : 9}
              lg={channelScreen ? 12 : 9}
            >
              <Tooltip title={title} TransitionComponent={Zoom} placement="bottom-end">
                <Typography noWrap className={classes.heading} gutterBottom>
                  {title}
                </Typography>
              </Tooltip>

              <Typography noWrap className={classes.channelName}>
                {channelTitle}
              </Typography>

              <Typography variant={"caption"}>
                {numeral(views).format("0.aa").toUpperCase()} views • {moment(publishedAt).fromNow()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Video;
