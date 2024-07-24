import actionTypes from "../actionType";
export default function gameWon({ winner }) {
  return {
    type: actionTypes.GAME_WON,
    payload: { winner },
  };
}
