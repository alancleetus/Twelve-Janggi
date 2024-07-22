import "./Pieces.css";
import Piece from "./Piece";
import { useRef } from "react";
import { copyPosition } from "../../../helper";
import { useAppContext } from "../../../contexts/Context";
import makeNewMove from "../../../reducer/actions/move";
import capturePiece from "../../../reducer/actions/capture";
import moveCaptured from "../../../reducer/actions/moveCaptured";
import clearCandidates from "../../../reducer/actions/clearCandidateMoves";

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

  const onDrop = (e) => {
    // position of piece being moved
    const [piece, row, col, index] = e.dataTransfer.getData("text").split(",");

    const newPosition = copyPosition(currPosition);
    const { x, y } = calculateCoords(e);

    if (appState.candidateMoves?.find((m) => m[0] === x && m[1] === y)) {
      console.log(`Moving ${piece} from ${row}-${col} to ${x}-${y}`);

      //when moving captured piece
      if (row == -1 && col == -1) {
        if (piece.includes("white")) {
          dispatch(
            moveCaptured({
              newCapturedList: currWhiteCaptured.filter((piece, i) => {
                return index != i;
              }),
              actorColor: "white",
            })
          );
        } else if (piece.includes("black")) {
          dispatch(
            moveCaptured({
              newCapturedList: currBlackCaptured.filter((piece, i) => {
                return index != i;
              }),
              actorColor: "black",
            })
          );
        }
      }
      //moving board piece and not captured piece
      if (row > -1 && col > -1) newPosition[row][col] = "";
      newPosition[x][y] = piece;

      // if move location already has piece
      if (currPosition[x][y] !== "") {
        let capturedPiece = currPosition[x][y];

        if (capturedPiece.includes("white"))
          dispatch(
            capturePiece({
              newCapturedList: [
                ...currBlackCaptured,
                capturedPiece.replace("white", "black"),
              ],
              capturerColor: "black",
            })
          );
        else
          dispatch(
            capturePiece({
              newCapturedList: [
                ...currWhiteCaptured,
                capturedPiece.replace("black", "white"),
              ],
              capturerColor: "white",
            })
          );
      }

      dispatch(makeNewMove({ newPosition }));
    }

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
