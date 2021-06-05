import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleAuth } from "../../../redux/slices/authSlice";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import linkedInLogo from "../../../assets/linkedin-logo.svg";
import githubLogo from "../../../assets/github-logo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    height: "100vh",
    placeItems: "center",
    background: "#121417",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  ytLogo: {
    width: "130px",
    height: "130px",
    objectFit: "contain",
  },
  card: {
    width: "400px",
    height: "400px",
    background: "#16181B",
    textAlign: "center",
    borderRadius: "0.6rem",
  },

  title: {
    color: "#ffffff",
    marginTop: theme.spacing(5),
  },

  socialIcons: {
    marginTop: theme.spacing(4),
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const history = useHistory();

  const handleLogin = () => {
    dispatch(googleAuth());
  };

  useEffect(() => {
    if (accessToken) {
      history.push("/");
    }
  }, [accessToken, history]);
  return (
    <>
      <Box className={classes.root}>
        <Container className={classes.container}>
          <Card className={classes.card}>
            <CardContent>
              <img
                className={classes.ytLogo}
                src="http://pngimg.com/uploads/youtube/youtube_PNG102354.png"
                alt="youtubeLogo"
              />
            </CardContent>
            <Button variant="contained" onClick={handleLogin}>
              Login With Google
            </Button>
            <Typography variant="body1" className={classes.title}>
              Youtube Clone made using React, Redux, Firebase & Youtube Data API
            </Typography>
            <div className={classes.socialIcons}>
              <a
                href="https://www.linkedin.com/in/pratik-ghagare-554113198/"
                rel="noreferrer"
                target="_blank"
                style={{ marginRight: "2rem" }}
              >
                <img src={linkedInLogo} alt="LinkedInLogo" />
              </a>
              <a href="https://github.com/pratikghagare175" rel="noreferrer" target="_blank">
                <img src={githubLogo} alt="githubRepo" />
              </a>
            </div>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Login;
