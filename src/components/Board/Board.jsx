import "./Board.css";
import { getChar, getTileColor } from "../../helper";
import Pieces from "./Pieces/Pieces";
import RowLabel from "./Labels/RowLabel";
import ColLabel from "./Labels/ColLabel";
function Board() {
  const cols = [0, 1, 2];
  const rows = [4, 3, 2, 1];

  return (
    <div className="board">
      <RowLabel rows={rows} />
      <div className="tiles">
        {rows.map((row, i) => {
          return cols.map((col, j) => {
            return <div key={row + col} className={getTileColor(i, j)}></div>;
          });
        })}
      </div>
      <Pieces />

      <ColLabel cols={cols} />
    </div>
  );
}

export default Board;
