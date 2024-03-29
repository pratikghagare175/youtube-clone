import React, { useState, useEffect } from "react";
import moment from "moment";
import numeral from "numeral";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import Avatar from "@material-ui/core/Avatar";
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

  relatedContent: {
    marginLeft: "0.2rem",
    marginTop: "0.3rem",
  },

  searchCard: {
    maxHeight: 300,
    background: "#16181B",
    transition: "0.3s",
    marginBottom: "1rem",
    boxShadow: "0 2px 20px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 8px 50px -12.125px rgba(0,0,0,0.3)",
    },
  },

  searchImgDiv: {
    position: "relative",
    width: "300px",
    marginRight: 0,
    [theme.breakpoints.down("xs")]: {
      width: "150px",
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

  searchContentDiv: {
    marginLeft: "-3rem",
    marginTop: "0.3rem",

    [theme.breakpoints.down("xs")]: {
      marginLeft: "-1.5rem",
    },
  },

  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },

  video_title: {
    fontWeight: "bold",
    color: "#fff",
  },

  search_video_title: {
    fontWeight: "bold",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },

  searchChannelTitleDiv: {
    marginTop: "0.4rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0",
    },
  },
}));

const VideoHorizontal = ({ video, searchScreen }) => {
  const classes = useStyles();
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const history = useHistory();

  //? Desctructuring related video to get channel and video related data
  const channelId = video.snippet.channelId;
  const videoId = video.id.videoId;
  const isVideo = video.id.kind === "youtube#video";
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

  //? TO RENDER RELATED VIDEOS
  const RelatedVideos = () => {
    return (
      <>
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
              <div className={classes.relatedContent}>
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
      </>
    );
  };

  //? TO RENDER VIDEOS BY SEARCH
  const SearchVideos = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("xs"));
    //? Video Description
    const searchVideoDescription =
      videoDescription.length > 120 ? videoDescription.substring(0, 120) + "......" : videoDescription;

    return (
      <div className={classes.root}>
        {isVideo && (
          <Card className={classes.searchCard} onClick={handleVideoClick}>
            <Grid container>
              <Grid item xs={6} lg={4}>
                <div className={isVideo ? classes.searchImgDiv : classes.searchImgDivChannel}>
                  <CardMedia
                    className={classes.media}
                    component={() => (
                      <LazyLoadImage effect="blur" src={videoBanner} style={{ width: "100%" }} />
                    )}
                  ></CardMedia>
                  <span className={classes.duration}>{_duration}</span>
                </div>
              </Grid>
              <Grid item xs={6} lg={8}>
                <div className={classes.searchContentDiv}>
                  <Typography
                    noWrap
                    variant={matches ? "body2" : "h6"}
                    className={classes.search_video_title}
                  >
                    {videoTitle}
                  </Typography>
                  <Typography variant="caption">
                    {numeral(views).format("0.aa").toUpperCase()} views • {moment(publishedAt).fromNow()}
                  </Typography>
                  <Grid container spacing={0} style={{ marginTop: "0.7rem" }}>
                    <Grid item xs={3} lg={1}>
                      <Avatar key={videoId} src={channelIcon} className={classes.avatar} />
                    </Grid>
                    <Grid item xs={9} lg={10} className={classes.searchChannelTitleDiv}>
                      <Typography variant="body2" style={{ marginLeft: "-1rem" }}>
                        {channelTitle}
                      </Typography>
                    </Grid>
                  </Grid>
                  {/* Hide Description on mobile devices */}
                  <div style={{ marginTop: "1rem" }}>
                    <Typography variant="caption">{!matches ? searchVideoDescription : null}</Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Card>
        )}
      </div>
    );
  };

  return <div className={classes.root}>{searchScreen ? <SearchVideos /> : <RelatedVideos />}</div>;
};

export default VideoHorizontal;
