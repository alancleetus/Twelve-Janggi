import { createPosition } from "./helper";

export const initGame = {
  position: [createPosition()],
  turn: "white",
  whiteCapturedPieces: [],
  blackCapturedPieces: [],
};
