const getChar = (i) => String.fromCharCode(i + 97);
const getTileColor = (row, col) => {
  return (row + col) % 2 === 0 ? "tile tile-light" : "tile tile-dark";
};

const createPosition = () => {
  const position = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  position[0][0] = "General-black";
  position[0][1] = "King-black";
  position[0][2] = "Minister-black";
  position[1][1] = "Man-black";

  position[2][1] = "Man-white";
  position[3][0] = "Minister-white";
  position[3][2] = "General-white";
  position[3][1] = "King-white";
  return position;
};

const copyPosition = (position) => {
  const newPosition = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  position.map((row, i) =>
    row.map((col, j) => {
      newPosition[i][j] = position[i][j];
    })
  );

  return newPosition;
};
export { getChar, getTileColor, createPosition, copyPosition };
