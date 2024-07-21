import "./Piece.css";

export default function Piece({ row, col, piece, setPosition }) {
  const dragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => (e.target.style.display = "none"), 0);
    e.dataTransfer.setData("text/plain", `${piece},${row},${col}`);
    console.log(e);
  };
  const dragEnd = (e) =>
    setTimeout(() => (e.target.style.display = "block"), 0);
  return (
    <img
      draggable
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      className={`piece p-${row}${col} pr-${row} pc-${col} ${piece}`}
      src={`./assets/${piece}.png`}
      alt={piece}
    />
  );
}
