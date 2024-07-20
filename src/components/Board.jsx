import "./Board.css";
import { getChar, getTileColor } from "../helper";
function Board() {
  const cols = [0, 1, 2];
  const rows = [0, 1, 2, 3];

  return (
    <>
      <div className="tiles">
        {rows.map((row) => {
          return cols.map((col) => {
            return (
              <div key={row + col} className={getTileColor(row, col)}>
                {row + " " + getChar(col)}
              </div>
            );
          });
        })}
      </div>
    </>
  );
}

export default Board;
