import "./App.css";
import { Container, Box } from "@material-ui/core";
import { BowDemo } from "./components/BowDemo";
// import { Speed } from "@material-ui/icons";
import speedometer from "./media/speedometer.png";

function App() {
  return (
    <Container maxWidth="md" disableGutters={true}>
      <div className="App">
        <Box
          py={2}
          bgcolor="warning.main"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box fontSize={50} color="secondary.main">
            Archery Speed
          </Box>
          <Box ml={2}>
            {/* <Speed fontSize="large" color="secondary" /> */}
            <img src={speedometer} alt="speedometer" />
          </Box>
        </Box>

        <BowDemo />
      </div>
    </Container>
  );
}

export default App;
