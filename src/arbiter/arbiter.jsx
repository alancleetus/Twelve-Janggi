import {
  getMinisterMoves,
  getGeneralMoves,
  getManMoves,
  getKingMoves,
  getFeudalLordMoves,
  getCapturedMoves,
} from "./getMoves";

const arbiter = {
  getValidMoves: function ({ currPosition, piece, row, col }) {
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
  getCapturedMoves: function ({ currPosition }) {
    return getCapturedMoves({ currPosition });
  },
};

export default arbiter;
