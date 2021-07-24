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
import WatchScreen from "./components/pages/watchScreen/WatchScreen";
import SearchScreen from "./components/pages/searchScreen/SearchScreen";
import { useSelector } from "react-redux";
import SubscriptionScreen from "./components/pages/subscriptionScreen/SubscriptionScreen";
import ChannelScreen from "./components/pages/channelScreen/ChannelScreen";

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
  const accessToken = useSelector((state) => state.auth.accessToken);
  const history = useHistory();

  if (!accessToken) {
    history.push("/login");
  }
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
      <Route path="/search/:query" exact>
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route path="/watch/:videoId" exact>
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>

      <Route path="/feed/subscriptions" exact>
        <Layout>
          <SubscriptionScreen />
        </Layout>
      </Route>

      <Route path="/channel/:channelId" exact>
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>

      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
