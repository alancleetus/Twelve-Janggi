export const reducer = (state, action) => {
  switch (action.type) {
    case "NEW_MOVE": {
      return {
        ...state,
        position: action.payload.newPosition,
      };
    }
    case "CAPTURE_PIECE": {
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
    case "USE_CAPTURED": {
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
    default:
      return state;
  }
};
