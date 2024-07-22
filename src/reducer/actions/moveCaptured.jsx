import actionTypes from "../actionType";

export default function moveCaptured({ newCapturedList }) {
  return {
    type: actionTypes.MOVE_CAPTURED,
    payload: { newCapturedList },
  };
}
