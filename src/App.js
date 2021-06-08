import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import theme from "./Theme";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import HomeScreen from "./components/pages/homescreen/HomeScreen";
import Login from "./components/pages/login/Login";

const useStyles = makeStyles((theme) => ({
  app_container: {
    display: "flex",
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const [toggleSidebar, setToggleSidebar] = useState(true);

  const handleToggleSidebar = () => setToggleSidebar((value) => !value);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header handleToggleSidebar={handleToggleSidebar} />
        <div className={classes.app_container}>
          <SideBar open={toggleSidebar} />
          <Container maxWidth="lg">{children}</Container>
        </div>
      </ThemeProvider>
    </>
  );
};

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>
      <Route path="/login" exact>
        <Login />
      </Route>
      <Route path="/search" exact>
        <Layout>
          <h1>Searching</h1>
        </Layout>
      </Route>

      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
