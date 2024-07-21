import "./Pieces.css";
import Piece from "./Piece";
import { useRef, useState } from "react";
import { createPosition, copyPosition } from "../../../helper";

const Pieces = () => {
  const ref = useRef();

  const [position, setPosition] = useState(createPosition);

  const calculateCoords = (e) => {
    // coords for where the piece was dropped
    const clientX = e.clientX;
    const clientY = e.clientY;

    // calculate where on board piece was dropped by
    // subtracting size of piece and margin between game board
    // and viewport
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const pieceWidth = width / 3;
    const y = Math.floor((e.clientX - left) / pieceWidth);
    const pieceHeight = height / 4;
    const x = Math.floor((e.clientY - top) / pieceHeight);
    return { x, y };
  };
  const onDrop = (e) => {
    // position of piece being moved
    const [piece, row, col] = e.dataTransfer.getData("text").split(",");

    console.log("moving:");
    console.log([piece, row, col]);

    const newPosition = copyPosition(position);
    const { x, y } = calculateCoords(e);

    console.log("to:");
    console.log([x, y]);

    console.log("old:");
    console.log(newPosition);
    if (row > -1 && col > -1) newPosition[row][col] = "";
    newPosition[x][y] = piece;

    console.log("new:");
    console.log(newPosition);
    setPosition(newPosition);
  };

  const dragOver = (e) => e.preventDefault();

  return (
    <div ref={ref} className="pieces" onDrop={onDrop} onDragOver={dragOver}>
      {position.map((row, i) =>
        row.map((col, j) => {
          return (
            <Piece
              key={i + j}
              row={i}
              col={j}
              piece={position[i][j]}
              setPosition={setPosition}
            />
          );
        })
      )}
    </div>
  );
};

export default Pieces;
