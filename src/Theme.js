import { createMuiTheme } from "@material-ui/core/styles";

const textColor = "#b1bdb4";
const ytPrimary = "#16181b";

export default createMuiTheme({
  palette: {
    background: {
      default: `${ytPrimary}`,
    },

    primary: {
      main: `${ytPrimary}`,
    },

    // secondary: {
    //   main: `${ytSecondary}`,
    // },
    text: {
      primary: `${textColor}`,
    },
  },
});
