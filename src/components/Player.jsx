import "./Player.css";
const Player = ({ playerId }) => {
  const dragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => (e.target.style.display = "none"), 0);
    e.dataTransfer.setData("text/plain", `${piece},-1,-1`);
    console.log(e);
  };
  const dragEnd = (e) => (e.target.style.display = "block");

  const piece = "Man-white";

  return (
    <div className="player-area">
      <p>Player_{playerId}</p>

      <div className="player-box">
        <img
          draggable
          onDragStart={dragStart}
          onDragEnd={dragEnd}
          className={`piece-icon ${piece}`}
          src={`./assets/${piece}.png`}
          alt={piece}
        />
      </div>
    </div>
  );
};

export default Player;
