import "./Pieces.css";
import Piece from "./Piece";

const Pieces = () => {
  const position = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  console.log(position);

  position[0][0] = "General-black";
  position[0][1] = "King-black";
  position[0][2] = "Minister-black";
  position[1][1] = "Man-black";

  position[2][1] = "Man-white";
  position[3][0] = "Minister-white";
  position[3][2] = "General-white";
  position[3][1] = "King-white";

  return (
    <div className="pieces">
      {position.map((row, i) =>
        row.map((col, j) => {
          return <Piece key={i + j} row={i} col={j} piece={position[i][j]} />;
        })
      )}
    </div>
  );
};

export default Pieces;
