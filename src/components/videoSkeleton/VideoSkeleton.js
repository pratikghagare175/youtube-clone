import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 245,
    maxHeight: 270,
    background: "#16181B",
    transition: "0.3s",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 20px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 8px 50px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "65%",
  },
}));

const VideoSkeleton = () => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <div>
          <CardMedia>
            <Skeleton variant="rect" animation="wave" className={classes.media} />
          </CardMedia>
        </div>

        <CardContent className={classes.content}>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <Skeleton animation="wave" variant="circle" width={40} height={40} />
            </Grid>
            <Grid item xs={9}>
              <Skeleton animation="wave" height={13} width="75%" style={{ marginBottom: 6 }} />

              <Skeleton animation="wave" height={13} width="50%" style={{ marginBottom: 6 }} />

              <Skeleton animation="wave" height={13} width="90%" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoSkeleton;
