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
      if (action.payload.capturerColor === "black") {
        return {
          ...state,
          blackCapturedPieces: action.payload.newCapturedList,
        };
      } else if (action.payload.capturerColor === "white") {
        return {
          ...state,
          whiteCapturedPieces: action.payload.newCapturedList,
        };
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
