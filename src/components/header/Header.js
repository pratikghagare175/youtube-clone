import React from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AppsIcon from "@material-ui/icons/Apps";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, fade } from "@material-ui/core/styles";
import youtubeLogo from "../../assets/yt-logo.png";
import CategoriesBar from "../categoriesBar/CategoriesBar";

const ElevationScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(6),
  },
  toolbar: {
    minHeight: 128,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  categoryBar: {
    flexGrow: 1,
    alignSelf: "flex-end",
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1.5em",
    },

    [theme.breakpoints.down("xs")]: {
      marginBottom: "0.5em",
    },
  },

  menuButton: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(0),
    },
  },

  menuIcon: {
    fontSize: 30,
  },

  logo: {
    height: "2.3em",
  },

  logoContainer: {
    // marginLeft: "0.3em",
    marginTop: "5px",
    "&:hover": {
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  youtubeLogoText: {
    fontWeight: "700",
    marginBottom: "7px",
    textTransform: "none",
    color: "#ffffff",
  },

  search: {
    display: "flex",
    flex: "0.7",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: "auto",
    width: "500px",
    [theme.breakpoints.down("md")]: {
      flex: "1",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    display: "flex",
    flex: "0.9",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },

  remainingIcons: {
    display: "flex",
    flex: "0.15",
    marginLeft: "auto",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  avatar: {
    marginRight: theme.spacing(2),
  },

  categoryBar: {
    marginLeft: "230px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const Header = ({ handleToggleSidebar }) => {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  // const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <div className={classes.root}>
        <ElevationScroll>
          <AppBar className={classes.appbar}>
            <ToolBar disableGutters>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={() => handleToggleSidebar()}
              >
                <MenuIcon className={classes.menuIcon} />
              </IconButton>
              <Button
                // component={Link}
                // to="/"
                className={classes.logoContainer}
                // onClick={() => setValue(0)}
                disableRipple
              >
                <img alt="youtube_logo" className={classes.logo} src={youtubeLogo} />
                <Typography variant="h5" className={classes.youtubeLogoText}>
                  YouTube
                </Typography>
              </Button>

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  fullWidth={true}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>

              <div className={classes.remainingIcons}>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <AppsIcon />
                </IconButton>
              </div>
              <Avatar
                alt="Remy Sharp"
                className={classes.avatar}
                src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
              />
            </ToolBar>
            <div className={classes.categoryBar}>
              <CategoriesBar />
            </div>
          </AppBar>
          {/* <CategoriesBar /> */}
        </ElevationScroll>
      </div>

      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
