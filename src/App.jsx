import { useState } from "react";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import Dashboard from "./components/Dashboard";

function App() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const [steps, setSteps] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const regenerate = () => {
    setRefreshKey((prev) => prev + 1);
    setSteps(0);
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        background: "#e0f2fe",     // ← Change this color (Main Page Background)
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#1e2937" }}>
        Dynamic Wumpus Logic Agent
      </h1>

      <Controls
        rows={rows}
        cols={cols}
        setRows={setRows}
        setCols={setCols}
        regenerate={regenerate}
      />

      <Dashboard steps={steps} />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid
          key={refreshKey}
          rows={rows}
          cols={cols}
          setSteps={setSteps}
        />
      </div>
    </div>
  );
}

export default App;