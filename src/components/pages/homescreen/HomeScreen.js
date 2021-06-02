import React from "react";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Video from "../../video/Video";
import CategoriesBar from "../../categoriesBar/CategoriesBar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const HomeScreen = () => {
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {[...new Array(20)].map((video) => (
            <Grid item>
              <Video />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomeScreen;
