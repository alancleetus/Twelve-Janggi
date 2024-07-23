import "./Board.css";
import { getChar, getTileColor } from "../../helper";
import Pieces from "./Pieces/Pieces";
import RowLabel from "./Labels/RowLabel";
import ColLabel from "./Labels/ColLabel";
import { useAppContext } from "../../contexts/Context";
import arbiter from "../../arbiter/arbiter";
import { getKingPosition } from "../../arbiter/getMoves";
function Board() {
  const cols = [0, 1, 2];
  const rows = [4, 3, 2, 1];

  const { appState } = useAppContext();
  const { position } = appState;
  const currPosition = position[position.length - 1];

  const getClassName = (i, j) => {
    let classes = getTileColor(i, j);

    // console.log(`getTileColor(${i},${j})`);
    // console.log(appState);
    if (appState.candidateMoves?.find((m) => m[0] === i && m[1] === j)) {
      appState.candidateMoves.find((move) => {
        if (move[0] == i && move[1] == j) {
          currPosition[i][j]
            ? (classes += " attack-candidate")
            : (classes += " move-candidate");
        }
      });
    }

    const checkedTile = checkTile();

    if (checkedTile && checkedTile[0] == i && checkedTile[1] == j)
      classes += " checked";

    return classes;
  };
  const checkTile = () => {
    const isInCheck = arbiter.isPlayerInCheck({
      positionAfterMove: currPosition,
      player: appState.turn,
    });

    if (isInCheck) return getKingPosition(currPosition, appState.turn);

    return null;
  };

  return (
    <div className="board">
      <RowLabel rows={rows} />
      <div className="tiles">
        {rows.map((row, i) => {
          return cols.map((col, j) => {
            return <div key={row + col} className={getClassName(i, j)}></div>;
          });
        })}
      </div>
      <Pieces />

      <ColLabel cols={cols} />
    </div>
  );
}

export default Board;
