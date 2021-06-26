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

const VideoHorizontal = () => {
  const classes = useStyles();

  const seconds = moment.duration("0000000").asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Grid container>
          <Grid item xs={4} md={4}>
            <div style={{ position: "relative", width: "120px" }}>
              <CardMedia
                className={classes.media}
                component={() => (
                  <LazyLoadImage
                    effect="blur"
                    src="https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_1280,h_720/https://blog.snappa.com/wp-content/uploads/2019/01/YouTube-Thumbnail-Dimensions.jpg"
                    style={{ width: "100%" }}
                  />
                )}
              ></CardMedia>
              <span className={classes.duration}>{_duration}</span>
            </div>
          </Grid>
          <Grid item xs={8} md={8}>
            <div style={{ marginLeft: "0.2rem", marginTop: "0.3rem" }}>
              <Typography variant="body2" noWrap className={classes.video_title}>
                This is gonna be the titile ssdfsdfsdfsdf
              </Typography>
              <Typography variant="caption" noWrap style={{ display: "block" }}>
                Pratik Ghagare
              </Typography>
              <Typography variant="caption">
                {numeral(10000).format("0.aa").toUpperCase()} views • {moment("2021-06-20").fromNow()}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default VideoHorizontal;
