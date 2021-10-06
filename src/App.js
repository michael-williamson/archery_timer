import "./App.css";
import { Container, Box } from "@material-ui/core";
import { BowDemo } from "./components/BowDemo";
import { Speed } from "@material-ui/icons";

function App() {
  return (
    <Container maxWidth="md" disableGutters={true}>
      <div className="App">
        <div className="title">
          <Box fontSize={50} color="secondary.main">
            Archery Speed
          </Box>
          <Box mt={2}>
            <Speed fontSize="large" color="secondary" />
          </Box>
        </div>
        <BowDemo />
      </div>
    </Container>
  );
}

export default App;
