function Controls({
  rows,
  cols,
  setRows,
  setCols,
  regenerate,
}) {
  const handleRowsChange = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      setRows("");        // Allow temporary empty for better UX
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setRows(Math.max(2, num));
    }
  };

  const handleColsChange = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      setCols("");
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setCols(Math.max(2, num));
    }
  };

  const handleGenerate = () => {
    const validRows = typeof rows === "number" && rows >= 2 ? rows : 4;
    const validCols = typeof cols === "number" && cols >= 2 ? cols : 4;

    // Force update the state to valid numbers before regenerating
    if (rows !== validRows) setRows(validRows);
    if (cols !== validCols) setCols(validCols);

    regenerate();
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        marginBottom: "25px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div>
        <label style={{ marginRight: "6px", fontSize: "14px" }}>Rows:</label>
        <input
          type="number"
          min="2"
          max="8"
          value={rows}
          onChange={handleRowsChange}
          style={{
            width: "90px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <div>
        <label style={{ marginRight: "6px", fontSize: "14px" }}>Columns:</label>
        <input
          type="number"
          min="2"
          max="8"
          value={cols}
          onChange={handleColsChange}
          style={{
            width: "90px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <button
        onClick={handleGenerate}
        style={{
          padding: "10px 24px",
          background: "#3498db",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Generate New World
      </button>
    </div>
  );
}

export default Controls;