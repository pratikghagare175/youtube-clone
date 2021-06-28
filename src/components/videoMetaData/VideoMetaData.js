import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import numeral from "numeral";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LikeIcon from "@material-ui/icons/ThumbUp";
import DislikeIcon from "@material-ui/icons/ThumbDown";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  likes: {
    float: "right",
    marginRight: "-1.5rem",
    marginTop: "-0.4rem",
    [theme.breakpoints.down("md")]: {
      float: "none",
      marginTop: "0.6rem",
      marginRight: "0",
    },
  },
  divider: {
    background: "#e0e0e0",
    width: "96%",
    opacity: "0.1",
    marginBottom: "1rem",
  },
  channelName: {
    display: "inline-block",
    marginLeft: "1rem",
    marginBottom: "0.4rem",
  },
  subscribeBtn: {
    backgroundColor: "#CC0000",
    color: "#FFFFFF",
    float: "right",
    alignItems: "center",
    marginTop: "0.3rem",
    marginRight: "1.7rem",
    borderRadius: "0",

    [theme.breakpoints.down("md")]: {
      marginTop: "-2.7rem",
      marginRight: "1rem",
    },
  },
}));

const VideoMetaData = ({ video, videoId }) => {
  const classes = useStyles();

  const [readMore, setReadMore] = useState(false);
  // const { publishedAt, channelId, title, description } = video?.snippet;
  // const { viewCount, likeCount, dislikeCount } =  video?.statistics;

  return (
    <div className={classes.root}>
      {/* Video Title And Views Section */}
      <Grid container style={{ marginBottom: "0.7rem" }}>
        <Grid item xs={11} style={{ marginBottom: "0.9rem" }}>
          <Typography variant="h6" style={{ wordWrap: "break-word" }}>
            {video?.snippet.title}
          </Typography>
        </Grid>
        <Grid item justify="space-between" alignItems="center" xs={12} sm={6}>
          <Typography variant="body2">
            {numeral(video?.statistics.viewCount).format("0.aa").toUpperCase()} views •
            {moment(video?.statistics.publishedAt).fromNow()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
          <div className={classes.likes}>
            <Typography variant="body2" component="span" style={{ marginRight: "1rem" }}>
              <LikeIcon style={{ verticalAlign: "middle", marginRight: "0.2rem" }} />
              {numeral(video?.statistics.likeCount).format("0.aa").toUpperCase()}
            </Typography>
            <Typography variant="body2" component="span">
              <DislikeIcon style={{ verticalAlign: "middle", marginRight: "0.2rem" }} />
              {numeral(video?.statistics.dislikeCount).format("0.aa").toUpperCase()}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <Divider classes={{ root: classes.divider }} />
      {/* Channel Meta Data */}
      <Grid container style={{ marginBottom: "0.6rem" }}>
        <Grid item xs={12} sm={6}>
          <Avatar
            alt="Remy Sharp"
            src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            style={{ display: "inline-block" }}
          />
          <div className={classes.channelName}>
            <Typography component="span" variant="body2">
              Pratik Ghagare
            </Typography>
            <br />
            <Typography component="span" variant="body2">
              1k Subscribers
            </Typography>
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Button className={classes.subscribeBtn}>Subscribe</Button>
        </Grid>
      </Grid>
      <Divider classes={{ root: classes.divider }} />
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: "0.5rem" }}>
          {readMore
            ? video?.snippet.description
            : video?.snippet.description.substring(0, 200) + "......"}

          <Button
            onClick={() => setReadMore(!readMore)}
            style={{ display: "block", marginTop: "0.5rem" }}
          >
            {readMore ? "Show Less" : "Show More"}
          </Button>
        </Grid>
      </Grid>
      <Divider classes={{ root: classes.divider }} />
    </div>
  );
};

export default VideoMetaData;
