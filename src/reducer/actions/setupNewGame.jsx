import actionTypes from "../actionType";
import { initGame } from "../../constants";

export const setupNewGame = () => {
  return {
    type: actionTypes.NEW_GAME,
    payload: initGame,
  };
};
