import preAuth from "@/services/apis/preAuth";
import { useUIStore } from "@/store/ui.store";
import React, { useState } from "react";

const Loader = ({ size = 48, color = "#3498db" }) => {
  const setActiveTab = useUIStore((s) => s.setActiveTab);
  const [error, setError] = useState<string | null>(null);

  preAuth(
    () => {
      setActiveTab("login");
    },
    (err) => {
      setError("Connection failed.");
    },
  );

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    background: "var(--bg-void)",
  };

  const spinnerStyle = {
    width: size,
    height: size,
    border: `4px solid rgba(255, 255, 255, 0.1)`,
    borderTop: `4px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div style={containerStyle}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={spinnerStyle} />
      <p style={{ color: "white", marginTop: "10px" }}>
        Initializing Session...
      </p>
    </div>
  );
};

export default Loader;
