import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import SubscriptionIcon from "@material-ui/icons/Subscriptions";
import LikedIcon from "@material-ui/icons/ThumbUp";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "4rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1.5em",
    },

    [theme.breakpoints.down("xs")]: {
      marginBottom: "0.5em",
    },
  },

  drawer: {
    width: drawerWidth,
    zIndex: theme.zIndex.modal + 1,
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(6),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },

  drawerColor: {
    backgroundColor: "#16181b",
  },

  listText: {
    color: "#7F8580",
    fontWeight:"bold"
  },

  iconList: {
    textDecoration: "none",
    "&:hover": {
      backgroundColor: "#4c4c4c",
    },
  },

  iconColor: {
    color: "#7F8580",
  },
}));

const SideBar = ({ open }) => {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogout = () =>{
    dispatch(logout());
    history.push("/login")
  }

  return (
    <div>
      <CssBaseline />

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
            [classes.drawerColor]: "#161811",
          }),
        }}
      >
        <div className={classes.toolbarMargin} />
        <List>
          <ListItem className={classes.iconList} component={Link} to="/">
            <ListItemIcon>
              <HomeIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Home" className={classes.listText} />
          </ListItem>
          <ListItem className={classes.iconList} component={Link} to="/feed/subscriptions">
            <ListItemIcon>
              <SubscriptionIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Subscriptions" className={classes.listText} />
          </ListItem>
          <ListItem className={classes.iconList} component={Link} to="/likedVideos">
            <ListItemIcon>
              <LikedIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Liked Videos" className={classes.listText} />
          </ListItem>
          <br />
          <br />
          <Divider />
          <ListItem className={classes.iconList} button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Logout" className={classes.listText} />
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </div>
  );
};

export default SideBar;
