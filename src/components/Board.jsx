import "./Board.css";
import { getChar, getTileColor } from "../helper";
function Board() {
  const cols = [0, 1, 2];
  const rows = [0, 1, 2, 3];

  return (
    <div className="board">
      <div className="row-labels-grid">
        {rows.map((row) => (
          <div key={row} className="row-label">
            {row}
          </div>
        ))}
      </div>
      <div className="tiles">
        {rows.map((row) => {
          return cols.map((col) => {
            return (
              <div key={row + col} className={getTileColor(row, col)}></div>
            );
          });
        })}
      </div>
      <div className="col-labels-grid">
        {cols.map((col) => (
          <div key={col} className="col-label">
            {getChar(col)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Board;
