import "./Pieces.css";
import Piece from "./Piece";
import { useRef } from "react";
import { useAppContext } from "../../../contexts/Context";
import makeNewMove from "../../../reducer/actions/move";
import capturePiece from "../../../reducer/actions/capture";
import moveCaptured from "../../../reducer/actions/moveCaptured";
import clearCandidates from "../../../reducer/actions/clearCandidateMoves";
import arbiter from "../../../arbiter/arbiter";

const Pieces = () => {
  const ref = useRef();

  //const [position, setPosition] = useState(createPosition);
  const { appState, dispatch } = useAppContext();
  const currPosition = appState.position[appState.position.length - 1];
  const currWhiteCaptured = appState.whiteCapturedPieces;
  const currBlackCaptured = appState.blackCapturedPieces;

  const calculateCoords = (e) => {
    // coords for where the piece was dropped
    const clientX = e.clientX;
    const clientY = e.clientY;

    // calculate where on board piece was dropped by
    // subtracting size of piece and margin between game board
    // and viewport
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const pieceWidth = width / 3;
    const y = Math.floor((clientX - left) / pieceWidth);
    const pieceHeight = height / 4;
    const x = Math.floor((clientY - top) / pieceHeight);
    return { x, y };
  };

  const moveCaptivePiece = (index) => {
    const newCapturedList = (
      appState.turn === "white" ? currWhiteCaptured : currBlackCaptured
    ).filter((piece, i) => {
      return index != i;
    });

    dispatch(
      moveCaptured({
        newCapturedList: newCapturedList,
      })
    );
  };

  const validateThenPerformMove = (e) => {
    // position of piece being moved
    const [piece, row, col, index] = e.dataTransfer.getData("text").split(",");
    const { x, y } = calculateCoords(e); //calculating new position

    // check if drop position is part of valid moves list
    if (appState.candidateMoves?.find((m) => m[0] === x && m[1] === y)) {
      console.log(`Moving ${piece} from ${row}-${col} to ${x}-${y}`);

      // if moving captured piece
      // remove captured piece from captured list
      if (row == -1 && col == -1) moveCaptivePiece(index);

      const newPosition = arbiter.calculateNewPosition({
        position: currPosition,
        piece,
        row,
        col,
        x,
        y,
      });

      // capture opponent piece
      if (currPosition[x][y] !== "") dispatch(capturePiece({ piece, x, y }));

      // make move
      dispatch(makeNewMove({ newPosition }));
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    validateThenPerformMove(e);
    dispatch(clearCandidates());
  };

  const dragOver = (e) => e.preventDefault();

  return (
    <div ref={ref} className="pieces" onDrop={onDrop} onDragOver={dragOver}>
      {currPosition.map((row, i) =>
        row.map((col, j) => {
          return (
            <Piece key={i + j} row={i} col={j} piece={currPosition[i][j]} />
          );
        })
      )}
    </div>
  );
};

export default Pieces;
