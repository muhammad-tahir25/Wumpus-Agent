function Dashboard({ steps }) {
  return (
    <div
      style={{
        background: "#ffffff",        // ← Change dashboard card color
        padding: "20px",
        width: "320px",
        margin: "0 auto 30px auto",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>Metrics Dashboard</h3>
      <p style={{ fontSize: "18px", fontWeight: "bold", color: "#1e40af" }}>
        Resolution Steps: {steps}
      </p>
    </div>
  );
}

export default Dashboard;