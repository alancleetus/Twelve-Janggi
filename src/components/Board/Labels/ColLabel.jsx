import "./ColLabel.css";

import { getChar } from "../../../helper";
export default function RowLabel({ cols }) {
  return (
    <div className="col-labels-grid">
      {cols.map((col) => (
        <div key={col} className="col-label">
          {getChar(col)}
        </div>
      ))}
    </div>
  );
}
