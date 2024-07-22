import actionTypes from "../actionType";

const capturePiece = ({ piece, x, y }) => {
  return {
    type: actionTypes.CAPTURE_PIECE,
    payload: { piece, x, y },
  };
};

export default capturePiece;
