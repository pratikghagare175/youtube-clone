import React, { useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux'
import { fetchSubscribedChannels } from '../../../redux/slices/subscriptionSlice';
import VideoHorizontal from '../../videoHorizontal/VideoHorizontal';
import SearchSkeleton from '../../videoSkeleton/SearchSkeleton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "-2.5rem",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0",
    },
  },
}));

const SubscriptionScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubscribedChannels())
  }, [dispatch]);

  const { loading, subscriptions } = useSelector((state) => state.subscriptionScreen);

  return (
    <div className={classes.root}>
      {!loading
        ? subscriptions?.map((video) => <VideoHorizontal video={video} key={video.id} ubscriptionScreen />)
        : subscriptions?.map((val, i) => <SearchSkeleton />)}
    </div>
  );
}

export default SubscriptionScreen
