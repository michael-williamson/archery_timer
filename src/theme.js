import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      //yellow
      main: "#ffff00",
      //green
      contrastText: "#5b822e",
    },
    secondary: {
      //blue
      main: "#0095da",
    },
    error: {
      main: red.A400,
    },
    info: {
      main: "#fff",
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
