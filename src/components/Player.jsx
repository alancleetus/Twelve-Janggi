import "./Player.css";
const Player = ({ playerId }) => {
  return (
    <div className="player-area">
      <p>Player_{playerId}</p>
      <div className="player-box">
        {/* <div className="player-tile">test</div>  */}
        <div className="player-tile" draggable>
          test
        </div>
        <div className="player-tile" draggable>
          test
        </div>
      </div>
    </div>
  );
};

export default Player;
