import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "./Theme";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import { useState } from "react";
import HomeScreen from "./components/pages/homescreen/HomeScreen";

const App = () => {
  const [toggleSidebar, setToggleSidebar] = useState(true);

  const handleToggleSidebar = () => setToggleSidebar((value) => !value);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header handleToggleSidebar={handleToggleSidebar} />
      <SideBar open={toggleSidebar} />
      {/* <HomeScreen /> */}
    </ThemeProvider>
  );
};

export default App;
