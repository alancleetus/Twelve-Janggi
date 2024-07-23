import "./Piece.css";
import { useAppContext } from "../../../contexts/Context";
import arbiter from "../../../arbiter/arbiter";
import generateCandidateMoves from "../../../reducer/actions/generateCandidateMove";

export default function Piece({ row, col, piece }) {
  const { appState, dispatch } = useAppContext();
  const { turn, position } = appState;

  const currPosition = position[position.length - 1];

  const dragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => (e.target.style.display = "none"), 0);
    e.dataTransfer.setData("text/plain", `${piece},${row},${col}`);
    //console.log(e);

    //if valid turn
    if (piece.includes(turn)) {
      //generate candidate moves for the piece being moved
      const candidateMoves = arbiter.getValidMoves({
        currPosition,
        piece,
        row,
        col,
      });

      dispatch(generateCandidateMoves({ newCandidateMoves: candidateMoves }));
    }
  };
  const dragEnd = (e) => {
    e.target.style.display = "block";
  };
  return (
    <img
      draggable={piece.includes(turn)}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      className={`piece p-${row}${col} pr-${row} pc-${col} ${piece}`}
      src={`./assets/${piece}.png`}
      alt={piece}
    />
  );
}
