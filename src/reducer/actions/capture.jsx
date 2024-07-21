import actionTypes from "../actionType";
export default function capturePiece({ newCapturedList, capturerColor }) {
  return {
    type: actionTypes.CAPTURE_PIECE,
    payload: { newCapturedList, capturerColor },
  };
}
