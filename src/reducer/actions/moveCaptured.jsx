import actionTypes from "../actionType";

export default function moveCaptured({ newCapturedList, actorColor }) {
  return {
    type: actionTypes.MOVE_CAPTURED,
    payload: { newCapturedList, actorColor },
  };
}
