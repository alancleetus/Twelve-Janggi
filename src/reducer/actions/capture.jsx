import actionTypes from "../actionType";

const capturePiece = ({ piece, x, y }) => {
  console.log("reducer1");
  return {
    type: actionTypes.CAPTURE_PIECE,
    payload: { piece, x, y },
  };
};

export default capturePiece;
