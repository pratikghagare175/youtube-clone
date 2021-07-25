import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscribedChannels } from "../../../redux/slices/subscriptionSlice";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "-2.5rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0",
    },
  },
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

  imgDiv: {
    position: "relative",
    width: "220px",
    marginRight: 0,
    [theme.breakpoints.down("xs")]: {
      width: "150px",
    },
  },

  media: {
    paddingTop: "65%",
  },

  channelImg: {
    width: "60%",
    borderRadius: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "40%",
    },
  },

  channelTitle: {
    marginLeft: "-1rem",
    color: "#fff",
  },

  subscribeTime: {
    display: "block",
    marginLeft: "-1rem",
    marginTop: "0.5rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0",
    },
  },

  channelDescription: {
    display: "block",
    marginLeft: "-1rem",
    marginTop: "0.5rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0",
    },
  },
}));

const SubscriptionScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchSubscribedChannels());
  }, [dispatch]);

  const {  subscriptions } = useSelector((state) => state.subscriptionScreen);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const handleVideoClick = (channelId) => {
    history.push(`/channel/${channelId}`);
  };

  const Channel = () => {
    return (
      <div className={classes.root}>
        {subscriptions.map((channel) => {
          return (
            <Card
              className={classes.card}
              onClick={() => handleVideoClick(channel?.snippet.resourceId.channelId)}
            >
              <Grid container>
                <Grid item xs={3} lg={2}>
                  <div className={classes.imgDiv}>
                    <CardMedia
                      className={classes.media}
                      component={() => (
                        <LazyLoadImage
                          effect="blur"
                          src={channel?.snippet.thumbnails.medium.url}
                          className={classes.channelImg}
                        />
                      )}
                    ></CardMedia>
                  </div>
                </Grid>
                <Grid item xs={6} lg={10}>
                  <div className={classes.searchContentDiv}>
                    <Typography noWrap variant={"h6"} className={classes.channelTitle}>
                      {channel?.snippet.title}
                    </Typography>
                    <Typography variant="caption" className={classes.subscribeTime}>
                      Subscribed • {moment(channel?.snippet.publishedAt).fromNow()}
                    </Typography>
                    <Typography variant="caption" className={classes.channelDescription}>
                      {!matches ? channel?.snippet.description : null}
                    </Typography>
                    <Typography variant="caption" className={classes.channelDescription}>
                      {channel?.contentDetails.totalItemCount}
                      {"  "}Videos
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <Channel />
      {/* {!loading
        ? subscriptions?.map((video) => <VideoHorizontal video={video} key={video.id} subscriptionScreen />)
        : subscriptions?.map((val, i) => <SearchSkeleton />)} */}
    </div>
  );
};

export default SubscriptionScreen;
