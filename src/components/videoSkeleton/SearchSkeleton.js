import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  card: {
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
    paddingTop: "60%",
  },

  searchChannelTitleDiv: {
    marginTop: "0.7rem",
    marginLeft: "-0.7rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0.3rem",
    },
  },
}));

const SearchSkeleton = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <div>
      <Card className={classes.card}>
        <Grid container>
          <Grid item xs={5} lg={3}>
            <CardMedia>
              <Skeleton variant="rect" animation="wave" className={classes.media} />
            </CardMedia>
          </Grid>
          <Grid item xs={6} lg={9}>
            <div style={{ marginLeft: "1rem", marginTop: "0.3rem" }}>
              <Skeleton
                animation="wave"
                height={20}
                width={!matches ? "90%" : "100%"}
                style={{ marginBottom: "0.7rem" }}
              />

              <Skeleton
                animation="wave"
                height={13}
                width={!matches ? "30%" : "50%"}
                style={{ marginBottom: "1.3rem" }}
              />

              <Grid container spacing={0} style={{ marginBottom: "1rem" }}>
                <Grid item xs={3} lg={1}>
                  <Skeleton
                    animation="wave"
                    variant="circle"
                    width={!matches ? 40 : 25}
                    height={!matches ? 40 : 25}
                  />
                </Grid>
                <Grid item xs={9} lg={10}>
                  <Skeleton
                    animation="wave"
                    height={13}
                    width={!matches ? "20%" : "60%"}
                    className={classes.searchChannelTitleDiv}
                  />
                </Grid>
              </Grid>

              {!matches ? <Skeleton animation="wave" height={13} width="80%" /> : null}
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default SearchSkeleton;
