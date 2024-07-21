import actionTypes from "../actionType";
export default function makeNewMove({ newPosition }) {
  return {
    type: actionTypes.NEW_MOVE,
    payload: { newPosition },
  };
}
