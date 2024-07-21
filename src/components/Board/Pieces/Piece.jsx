import "./Piece.css";

export default function Piece({ row, col, piece }) {
  return (
    <img
      draggable
      className={`piece p-${row}${col} pr-${row} pc-${col} ${piece}`}
      src={`./assets/${piece}.png`}
      alt={piece}
    />
  );
}
