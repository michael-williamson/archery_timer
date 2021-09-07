import "./App.css";
import { Container } from "@material-ui/core";
import { BowDemo } from "./components/BowDemo";

function App() {
  return (
    <Container maxWidth="md">
      <div className="App">
        <h1>Traditional Archery</h1>
        <BowDemo />
      </div>
    </Container>
  );
}

export default App;
