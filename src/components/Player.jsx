import { useAppContext } from "../contexts/Context";
import "./Player.css";

const Player = ({ playerId }) => {
  const { appState } = useAppContext();

  const currWhiteCaptured = appState.whiteCapturedPieces;
  const currBlackCaptured = appState.blackCapturedPieces;

  const dragStart = (e, piece, index) => {
    console.log(piece);
    console.log(index);
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => (e.target.style.display = "none"), 0);
    e.dataTransfer.setData("text/plain", `${piece},-1,-1,${index}`);
    console.log(e);
  };

  const dragEnd = (e) => (e.target.style.display = "block");

  return (
    <div className="player-area">
      <p>Player_{playerId}</p>

      {playerId === "white" ? (
        <div className="player-box">
          {currWhiteCaptured.map((piece, index) => (
            <img
              key={playerId + piece}
              draggable
              onDragStart={(e) => dragStart(e, piece, index)}
              onDragEnd={dragEnd}
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
              draggable
              onDragStart={(e) => dragStart(e, piece, index)}
              onDragEnd={dragEnd}
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
