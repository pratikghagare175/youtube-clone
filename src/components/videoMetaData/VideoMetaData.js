import React from "react";
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
    //flexGrow: 1,
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
    [theme.breakpoints.down("md")]: {
      marginTop: "-2.7rem",
      marginRight: "0.7rem",
    },
  },
}));

const VideoMetaData = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* Video Title And Views Section */}
      <Grid container style={{ marginBottom: "0.7rem" }}>
        <Grid item xs={12} style={{ marginBottom: "0.5rem" }}>
          <Typography variant="h6">Video Title</Typography>
        </Grid>
        <Grid item justify="space-between" alignItems="center" xs={12} sm={6}>
          <Typography variant="body2">
            {numeral(10000).format("0.aa").toUpperCase()} views • {moment("2021-06-20").fromNow()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
          <div className={classes.likes}>
            <Typography variant="body2" component="span" style={{ marginRight: "1rem" }}>
              <LikeIcon style={{ verticalAlign: "middle" }} />
              {numeral(10000).format("0.aa").toUpperCase()}
            </Typography>
            <Typography variant="body2" component="span">
              <DislikeIcon style={{ verticalAlign: "middle" }} />
              {numeral(10000).format("0.aa").toUpperCase()}
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
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium, at eius dolor odio autem,
          impedit necessitatibus accusamus odit neque quis a pariatur distinctio animi dicta repudiandae
          adipisci placeat accusantium, expedita quo amet. Nostrum, similique atque est iste rerum
          corrupti nemo culpa, illum molestiae quas, facilis vel quasi cum ad facere.
        </Grid>
      </Grid>
    </div>
  );
};

export default VideoMetaData;
