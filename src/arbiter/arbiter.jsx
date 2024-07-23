import {
  getMinisterMoves,
  getGeneralMoves,
  getManMoves,
  getKingMoves,
  getFeudalLordMoves,
  getCapturedMoves,
  getKingPosition,
  getPieces,
} from "./getMoves";
import { simulateMovePiece } from "./move";

const arbiter = {
  getPossibleMoves: function ({ currPosition, piece, row, col }) {
    if (piece.includes("Minister")) {
      return getMinisterMoves({ currPosition, piece, row, col });
    } else if (piece.includes("General")) {
      return getGeneralMoves({ currPosition, piece, row, col });
    } else if (piece.includes("Man")) {
      return getManMoves({ currPosition, piece, row, col });
    } else if (piece.includes("King")) {
      return getKingMoves({ currPosition, piece, row, col });
    } else if (piece.includes("Lord")) {
      return getFeudalLordMoves({ currPosition, piece, row, col });
    }
  },
  getValidMoves: function ({ currPosition, piece, row, col }) {
    let moves = this.getPossibleMoves({ currPosition, piece, row, col });
    const notInCheckMoves = [];

    // check if each moves puts the current players king in check
    moves.forEach(([x, y]) => {
      const positionAfterMove = this.calculateNewPosition({
        position: currPosition,
        piece,
        row,
        col,
        x,
        y,
      });

      const player = piece.includes("white") ? "white" : "black";

      let inCheck = this.isPlayerInCheck({
        positionAfterMove,
        position: currPosition,
        player,
      });
      console.log({ player, positionAfterMove, inCheck });
      if (!inCheck) {
        notInCheckMoves.push([x, y]);
      }
    });
    return notInCheckMoves;
  },
  getCapturedMoves: function ({ currPosition }) {
    return getCapturedMoves({ currPosition });
  },
  calculateNewPosition: function ({ position, piece, row, col, x, y }) {
    //returns new position after move
    return simulateMovePiece({ position, piece, row, col, x, y });
  },
  isPlayerInCheck: function ({ positionAfterMove, player }) {
    const enemy = player.includes("white") ? "black" : "white";

    //get kings current position
    let kingPos = getKingPosition(positionAfterMove, player);

    // get all enemy pieces and their locations
    const enemyPieces = getPieces(positionAfterMove, enemy);

    // make a list of all the possible tiles the enemy can move into
    /**
     * * Reduce Usage:
     * ! array.reduce(callback(accumulator, currentValue, currentIndex, array), initialValue);
     * * accumulator: The accumulated value previously returned in the last invocation of the callback, or the initialValue if supplied.
     * * currentValue: The current element being processed in the array.
     *  currentIndex (optional): The index of the current element being processed in the array.
     *  array (optional): The array reduce was called upon.
     *  initialValue (optional): A value to use as the first argument to the first call of the callback. If no initialValue is supplied, the first element in the array will be used as the initial accumulator value, and the iteration will start from the second element.
     */
    const enemyMoves = enemyPieces.reduce(
      (accumulator, currentValue) =>
        (accumulator = [
          ...accumulator,
          ...this.getPossibleMoves({
            currPosition: positionAfterMove,
            ...currentValue,
          }),
        ]),

      []
    );

    if (enemyMoves.some(([x, y]) => kingPos[0] === x && kingPos[1] === y))
      return true;
    else return false;
  },
};

export default arbiter;
