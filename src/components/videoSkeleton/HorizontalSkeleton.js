import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 450,
    maxHeight: 300,
    background: "#16181B",
    transition: "0.3s",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 20px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 8px 50px -12.125px rgba(0,0,0,0.3)",
    },
    // [theme.breakpoints.down("md")]: {
    //   maxWidth: 280,
    //   width: "100%",
    // },
  },
  media: {
    paddingTop: "65%",
  },
}));

const HorizontalSkeleton = () => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}>
        <Grid container>
          <Grid item xs={4} md={4}>
            <CardMedia>
              <Skeleton variant="rect" animation="wave" className={classes.media} />
            </CardMedia>
          </Grid>
          <Grid item xs={8} md={8}>
            <div style={{ marginLeft: "0.2rem", marginTop: "0.3rem" }}>
              <Skeleton animation="wave" height={13} width="75%" style={{ marginBottom: 6 }} />

              <Skeleton animation="wave" height={13} width="50%" style={{ marginBottom: 6 }} />

              <Skeleton animation="wave" height={13} width="90%" />
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default HorizontalSkeleton;
