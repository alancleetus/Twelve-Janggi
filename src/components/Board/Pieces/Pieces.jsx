import "./Pieces.css";

const Pieces = () => {
  const position = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  console.log(position);

  position[0][0] = "minister-black";
  position[0][1] = "king-black";
  position[0][2] = "general-black";
  position[1][1] = "man-black";

  position[3][2] = "minister-white";
  position[3][1] = "king-white";
  position[3][0] = "general-white";
  position[2][1] = "man-white";

  return (
    <div className="pieces">
      {position.map((row, i) =>
        row.map((col, j) => {
          return position[i][j] ? position[i][j] : null;
        })
      )}
    </div>
  );
};

export default Pieces;
