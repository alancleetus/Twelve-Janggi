import { copyPosition } from "../helper";

export const simulateMovePiece = ({ position, piece, row, col, x, y }) => {
  const newPosition = copyPosition(position);

  //moving board piece and not captured piece
  if (row > -1 && col > -1) newPosition[row][col] = ""; //remove piece being moved from old position

  //promoting if man reaches enemy land
  if (piece.includes("Man") && (x == 0 || x == 3)) {
    newPosition[x][y] = piece.replace("Man", "Feudal-Lord"); // promote man to feudal lord
  } else newPosition[x][y] = piece; // place piece onto new position

  return newPosition;
};
