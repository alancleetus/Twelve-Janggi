const getMinisterMoves = ({ currPosition, piece, row, col }) => {
  const directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  const moves = getValidMoves({ currPosition, piece, row, col, directions });

  return moves;
};

const getGeneralMoves = ({ currPosition, piece, row, col }) => {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const moves = getValidMoves({ currPosition, piece, row, col, directions });
  return moves;
};

const getManMoves = ({ currPosition, piece, row, col }) => {
  const us = piece.includes("white") ? "white" : "black";
  const directions = us === "black" ? [[1, 0]] : [[-1, 0]];

  const moves = getValidMoves({ currPosition, piece, row, col, directions });
  return moves;
};

const getKingMoves = ({ currPosition, piece, row, col }) => {
  const directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const moves = getValidMoves({ currPosition, piece, row, col, directions });
  return moves;
};

const getFeudalLordMoves = ({ currPosition, piece, row, col }) => {
  const us = piece.includes("white") ? "white" : "black";
  const directions =
    us === "black"
      ? [
          [1, -1],
          [1, 1],
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ]
      : [
          [-1, -1],
          [-1, 1],
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
        ];

  const moves = getValidMoves({ currPosition, piece, row, col, directions });
  return moves;
};

const getCapturedMoves = ({ currPosition }) => {
  const moves = [];

  for (let i = 1; i <= 2; i++) {
    for (let j = 0; j <= 2; j++) {
      if (currPosition[i][j] == "") moves.push([i, j]);
    }
  }
  return moves;
};

const getValidMoves = ({ currPosition, piece, row, col, directions }) => {
  const moves = [];
  const us = piece.includes("white") ? "white" : "black";
  const enemy = us.includes("white") ? "black" : "white";
  directions.forEach((dir) => {
    const newRow = row + dir[0];
    const newCol = col + dir[1];

    //console.log(`Checking new position: position: [${newRow},${newCol}]`);
    // if that tile is valid
    if (currPosition?.[newRow]?.[newCol] === undefined) {
      //console.log(`Tile out of bounds`);
      return;
    }
    // if tile contains same colored piece
    if (currPosition[newRow][newCol].includes(us)) {
      //console.log(`Tile has same colored piece`);
      return;
    }
    //if tile contains enemy piece
    if (currPosition[newRow][newCol].includes(enemy)) {
      // console.log(`Found valid tile with enemy`);
      moves.push([newRow, newCol]);
    }
    //if tile contains enemy piece
    if (currPosition[newRow][newCol] === "") {
      //console.log(`Found valid tile with no pieces`);
      moves.push([newRow, newCol]);
    }
  });

  return moves;
};

const getKingPosition = (position, player) => {
  let kingPos;
  position.forEach((row, x) => {
    row.forEach((col, y) => {
      if (position[x][y].includes("King-" + player)) kingPos = [x, y];
    });
  });
  return kingPos;
};

const getPieces = (position, color) => {
  const pieces = [];
  position.forEach((row, x) => {
    row.forEach((piece, y) => {
      if (piece.includes(color))
        pieces.push({
          piece: piece,
          row: x,
          col: y,
        });
    });
  });
  return pieces;
};

export {
  getMinisterMoves,
  getGeneralMoves,
  getManMoves,
  getKingMoves,
  getFeudalLordMoves,
  getCapturedMoves,
  getKingPosition,
  getPieces,
};
