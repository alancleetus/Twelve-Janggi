import "./App.css";
import Board from "./components/Board";
import Player from "./components/Player";

function App() {
  return (
    <div className="App">
      <Player key="1" playerId="1" />
      <Board />
      <Player key="2" playerId="2" />
    </div>
  );
}

export default App;
