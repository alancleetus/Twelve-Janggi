import "./Piece.css";

export default function Piece({ row, col, piece }) {
  const dragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => (e.target.style.display = "none"), 0);
    e.dataTransfer.setData("text/plain", `${piece},${row},${col}`);
    console.log(e);
  };
  const dragEnd = (e) => (e.target.style.display = "block");
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
