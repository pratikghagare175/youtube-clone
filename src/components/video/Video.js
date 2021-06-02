import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 245,
    background: "#16181B",
    margin: "auto",
    transition: "0.3s",
    marginBottom: "1.6rem",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "60%",
  },

  heading: {
    fontWeight: "bold",
  },
  duration: {
    position: "absolute",
    bottom: "0.3rem",
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
const Video = () => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <div style={{ position: "relative" }}>
          <CardMedia
            className={classes.media}
            image={"https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"}
          />
          <span className={classes.duration}>11:30</span>
        </div>

        <CardContent className={classes.content}>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <Avatar
                className={classes.avatar}
                key="hi"
                src="https://cdn2.iconfinder.com/data/icons/business-and-finance-related-hand-gestures/256/face_human_blank_user_avatar_mannequin_dummy-512.png"
              />
            </Grid>
            <Grid item xs={9}>
              <Tooltip
                title="Nature Around Us jsfojsdofdjfodfsdfsdfsdff"
                TransitionComponent={Zoom}
                placement="bottom-end"
              >
                <Typography noWrap className={classes.heading} gutterBottom>
                  Nature Around Us jsfojsdofdjfodfsdfsdfsdff
                </Typography>
              </Tooltip>

              <Typography className={classes.channelName}>Channel Name</Typography>

              <Typography variant={"caption"}>107K views • 2 years ago</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Video;
