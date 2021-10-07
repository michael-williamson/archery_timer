import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      //darkolivegreen
      main: "#556b2f",
      light: "#8dda20",
      //blanchedalmond
      contrastText: "#ffcc7f",
    },
    secondary: {
      //blanchedalmondalteration
      main: "#ffebcd",
      light: "rgb(121 255 6)",
    },
    error: {
      main: red.A400,
    },
    warning: {
      //header bg
      main: "#0000007a",
    },
    info: {
      main: "#fff",
    },
    background: {
      default: "#fff",
      paper: "#ebfbebcf",
    },
  },
  excessColors: {
    blueish: "#182770ab",
  },
  overrides: {},
});

export default theme;
