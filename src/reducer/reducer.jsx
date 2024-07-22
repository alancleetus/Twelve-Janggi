import actionTypes from "./actionType";

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.NEW_MOVE: {
      let { turn, position } = state;

      // toggle turn
      turn = turn === "white" ? "black" : "white";
      position = [...position, action.payload.newPosition];

      return {
        ...state,
        turn,
        position: position,
      };
    }
    case actionTypes.CAPTURE_PIECE: {
      console.log("reducer");
      const piece = action.payload.piece;
      const x = action.payload.x;
      const y = action.payload.y;
      const currPosition = state.position[state.position.length - 1];
      const currWhiteCaptured = state.whiteCapturedPieces;
      const currBlackCaptured = state.blackCapturedPieces;

      // if move location already has piece,capture that piece
      if (currPosition[x][y] !== "") {
        let capturedPiece = currPosition[x][y];

        // when a piece gets captured it's color swaps
        capturedPiece = capturedPiece.includes("white")
          ? capturedPiece.replace("white", "black")
          : capturedPiece.replace("black", "white");

        // add captured piece to list of captured pieces for the correct player
        const newCapturedList = [
          ...(piece.includes("white") ? currWhiteCaptured : currBlackCaptured),
          capturedPiece,
        ];

        if (state.turn === "black") {
          return {
            ...state,
            blackCapturedPieces: newCapturedList,
          };
        } else if (state.turn === "white") {
          return {
            ...state,
            whiteCapturedPieces: newCapturedList,
          };
        }
      }
      break;
    }

    case actionTypes.MOVE_CAPTURED: {
      console.log(action.payload);
      if (action.payload.actorColor === "black") {
        return {
          ...state,
          blackCapturedPieces: action.payload.newCapturedList,
        };
      } else if (action.payload.actorColor === "white") {
        return {
          ...state,
          whiteCapturedPieces: action.payload.newCapturedList,
        };
      }

      break;
    }
    case actionTypes.CANDIDATE_MOVE: {
      return {
        ...state,
        candidateMoves: action.payload.newCandidateMoves,
      };
    }
    case actionTypes.CLEAR_CANDIDATE_MOVE: {
      return {
        ...state,
        candidateMoves: [],
      };
    }
    default:
      return state;
  }
};
