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
  isCheckMate: function ({ currPosition, player, captivePieces }) {
    const isInCheck = this.isPlayerInCheck({
      positionAfterMove: currPosition,
      player,
    });

    // is the king in check?
    if (!isInCheck) return false;

    const playerBoardPieces = getPieces(currPosition, player);

    const availBoardPieceMoves = playerBoardPieces.reduce(
      (accumulator, currentValue) =>
        (accumulator = [
          ...accumulator,
          ...this.getPossibleMoves({
            currPosition,
            ...currentValue,
          }),
        ]),
      []
    );

    // get tiles where captives can move into
    const capturedMoves = this.getCapturedMoves({ currPosition });

    // for each possible position check
    // if moving piece into it will take the king out of check
    let availCaptiveMoves = [];
    if (captivePieces[0]) {
      for (let i in capturedMoves) {
        const positionAfterMove = simulateMovePiece({
          position: currPosition,
          piece: captivePieces[0], //only need to check for 1 single captive
          row: -1,
          col: -1,
          x: capturedMoves[i][0],
          y: capturedMoves[i][1],
        });

        const stillInCheck = this.isPlayerInCheck({
          positionAfterMove,
          player,
        });
        if (!stillInCheck)
          //if not in check after trying new moves
          availCaptiveMoves.push([capturedMoves[i][0], capturedMoves[i][1]]);
      }
    }

    console.log({ availBoardPieceMoves, availCaptiveMoves });
    if (
      isInCheck &&
      availBoardPieceMoves.length === 0 &&
      availCaptiveMoves.length === 0
    )
      return true;

    return false;
  },
  isKingInOpponentLand: function ({ player, currPosition, prevPosition }) {
    // get curr king location
    const currKingLocation = getKingPosition(currPosition, player);
    // if curr king was already in the opponent territory last turn,
    // then player wins
    const prevKingLocation = getKingPosition(prevPosition, player);

    console.log({ player, currKingLocation, prevKingLocation });
    if (player == "black")
      return (
        currKingLocation[0] == 3 && currKingLocation[0] == prevKingLocation[0]
      );
    else
      return (
        currKingLocation[0] == 0 && currKingLocation[0] == prevKingLocation[0]
      );
  },
};

export default arbiter;
