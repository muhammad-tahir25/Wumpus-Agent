function Cell({ data, isAgent }) {
  let text = "";
  let color = "#dfe6e9";

  if (data.visited) color = "#55efc4";

  if (data.pit) {
    text = "P";
    color = "#ff7675";
  } else if (data.wumpus) {
    text = "W";
    color = "#d63031";
  } else {
    if (data.breeze) text += "B ";
    if (data.stench) text += "S";
  }

  if (isAgent) {
    text = "A";
    color = "#74b9ff";
  }

  return (
    <div
      style={{
        width: "70px",
        height: "70px",
        background: color,
        borderRadius: "8px",
        border: "1px solid #636e72",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      {text}
    </div>
  );
}

export default Cell;