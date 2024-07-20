const getChar = (i) => String.fromCharCode(i + 97);
const getTileColor = (row, col) => {
  console.log(row);
  console.log(col);
  return (row + col) % 2 === 0 ? "tile tile-light" : "tile tile-dark";
};

export { getChar, getTileColor };
