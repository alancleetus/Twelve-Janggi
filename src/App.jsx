import { useReducer } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Player from "./components/Player";

import AppContext from "./contexts/Context";
import { reducer } from "./reducer/reducer";
import { initGame } from "./constants";

function App() {
  const [appState, dispatch] = useReducer(reducer, initGame);

  const providerState = { appState, dispatch };
  return (
    <AppContext.Provider value={providerState}>
      <div className="App">
        <Player key="1" playerId="black" />
        <Board />
        <Player key="2" playerId="white" />
      </div>
    </AppContext.Provider>
  );
}

export default App;
