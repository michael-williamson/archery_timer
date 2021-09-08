import "./App.css";
import { Container, Typography } from "@material-ui/core";
import { BowDemo } from "./components/BowDemo";

function App() {
  return (
    <Container maxWidth="md">
      <div className="App">
        <Typography variant="h3" color="primary" className="title">
          Bow Speed Simulator
        </Typography>
        <BowDemo />
      </div>
    </Container>
  );
}

export default App;
