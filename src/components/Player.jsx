import arbiter from "../arbiter/arbiter";
import { useAppContext } from "../contexts/Context";
import generateCandidateMoves from "../reducer/actions/generateCandidateMove";
import "./Player.css";

const Player = ({ playerId }) => {
  const { appState, dispatch } = useAppContext();
  const { turn, position } = appState;

  const currPosition = position[position.length - 1];
  const currWhiteCaptured = appState.whiteCapturedPieces;
  const currBlackCaptured = appState.blackCapturedPieces;

  const dragStart = (e, piece, index) => {
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => (e.target.style.display = "none"), 0);
    e.dataTransfer.setData("text/plain", `${piece},-1,-1,${index}`);

    //if valid turn
    if (piece.includes(turn)) {
      const candidateMoves = arbiter.getCapturedMoves({ currPosition });

      dispatch(generateCandidateMoves({ newCandidateMoves: candidateMoves }));
    }
  };
  const dragEnd = (e) => {
    e.target.style.display = "block";
  };

  return (
    <div className="player-area">
      <p style={{ color: playerId == turn && "green" }}>Player_{playerId}</p>

      {playerId === "white" ? (
        <div className="player-box">
          {currWhiteCaptured.map((piece, index) => (
            <img
              key={playerId + piece}
              draggable={playerId == turn}
              onDragStart={(e) => dragStart(e, piece, index)}
              onDragEnd={(e) => dragEnd(e)}
              className={`piece-icon ${piece}`}
              src={`./assets/${piece}.png`}
              alt={piece}
            />
          ))}
        </div>
      ) : (
        <div className="player-box">
          {currBlackCaptured.map((piece, index) => (
            <img
              key={playerId + piece}
              draggable={playerId == turn}
              onDragStart={(e) => dragStart(e, piece, index)}
              onDragEnd={(e) => dragEnd(e)}
              className={`piece-icon ${piece}`}
              src={`./assets/${piece}.png`}
              alt={piece}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Player;
