import "./RowLabel.css";

export default function RowLabel({ rows }) {
  return (
    <div className="row-labels-grid">
      {rows.map((row) => (
        <div key={row} className="row-label">
          {row}
        </div>
      ))}
    </div>
  );
}
