import { useAppContext } from "../contexts/Context";
import { setupNewGame } from "../reducer/actions/setupNewGame";
//import './GameEnds.css'

const GameEnds = () => {
  const { appState, dispatch } = useAppContext();

  if (appState.winner === "") return null;

  const newGame = () => {
    dispatch(setupNewGame());
  };

  return (
    <>
      <h1>Winner: {appState.winner}</h1>
      <button onClick={() => newGame()}>Restart Game</button>
    </>
  );
};

export default GameEnds;
