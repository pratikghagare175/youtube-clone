import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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
import HistoryIcon from "@material-ui/icons/History";
import LibraryIcon from "@material-ui/icons/LibraryBooks";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import HomeScreen from "../pages/homescreen/HomeScreen";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

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
    flexShrink: 0,
    whiteSpace: "nowrap",
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("md")]: {
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
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      flexGrow: 1,
      marginLeft: theme.spacing(3),
    },
  },

  drawerColor: {
    backgroundColor: "#16181b",
  },

  iconList: {
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

  return (
    <div className={classes.root}>
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
          <ListItem className={classes.iconList}>
            <ListItemIcon>
              <HomeIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem className={classes.iconList}>
            <ListItemIcon>
              <SubscriptionIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Subscriptions" />
          </ListItem>
          <ListItem className={classes.iconList}>
            <ListItemIcon>
              <LikedIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Liked Videos" />
          </ListItem>
          <ListItem className={classes.iconList}>
            <ListItemIcon>
              <HistoryIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
          <ListItem className={classes.iconList}>
            <ListItemIcon>
              <LibraryIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Library" />
          </ListItem>
          <br />
          <br />
          <Divider />
          <ListItem className={classes.iconList}>
            <ListItemIcon>
              <LogoutIcon className={classes.iconColor} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          <Divider />
        </List>
      </Drawer>
      <div className={classes.content}>
        <HomeScreen />
      </div>
    </div>
  );
};

export default SideBar;
