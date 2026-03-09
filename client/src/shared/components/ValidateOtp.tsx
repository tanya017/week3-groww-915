import React, { useState } from "react";
import { useUIStore } from "@/store/ui.store";
import validateOtp from "../../services/apis/validateOtp";

export default function ValidateOtp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setActiveTab = useUIStore((s) => s.setActiveTab);
  const setAccessToken = useUIStore((s) => s.setAccessToken);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    validateOtp(
      (data) => {
        setLoading(false);
        const token = data.token || data.jwtTokens.accessToken;
        if (token) {
        setAccessToken(token);
        console.log("OTP Verified Successfully");
        setActiveTab("dashboard");
      }
        
      },
      (err) => {
        setLoading(false);
        setError("Invalid OTP or Session Expired");
        console.error(err);
      }
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <header style={styles.header}>
          <h2 style={styles.title}>Two-Factor Auth</h2>
          <p style={styles.subtitle}>A verification code has been sent</p>
          <p style={styles.subtitle}>Otp is hardcoded</p>
        </header>

        <form onSubmit={handleVerify} style={styles.form}>
          <div style={styles.otpDisplay}>
            <span style={styles.codeDigit}>1</span>
            <span style={styles.codeDigit}>2</span>
            <span style={styles.codeDigit}>3</span>
            <span style={styles.codeDigit}>4</span>
            <span style={styles.codeDigit}>5</span>
            <span style={styles.codeDigit}>6</span>
          </div>

          {error && <p style={styles.errorText}>{error}</p>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "VERIFYING..." : "CONFIRM & ACCESS"}
          </button>
        </form>

        <button onClick={() => setActiveTab("login")} style={styles.backButton}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { display: "flex", flex: 1, alignItems: "center", justifyContent: "center", background: "var(--bg-void)" },
  card: { width: "100%", maxWidth: "380px", padding: "40px", background: "var(--bg-panel)", border: "1px solid var(--border)", borderRadius: "4px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" },
  header: { marginBottom: "30px" },
  title: { fontSize: "20px", color: "#fff", letterSpacing: "1px", textTransform: "uppercase" },
  subtitle: { fontSize: "12px", color: "var(--text-muted)", marginTop: "8px" },
  form: { display: "flex", flexDirection: "column", gap: "20px" },
  otpDisplay: { display: "flex", justifyContent: "center", gap: "10px", margin: "10px 0" },
  codeDigit: { width: "40px", height: "50px", lineHeight: "50px", background: "var(--bg-void)", border: "1px solid var(--border)", color: "#2ebd59", fontSize: "20px", fontWeight: "bold", borderRadius: "4px" },
  button: { padding: "14px", background: "#2ebd59", color: "#000", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", letterSpacing: "1px" },
  errorText: { color: "#ff4d4d", fontSize: "12px", margin: "0" },
  backButton: { marginTop: "20px", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "11px", textDecoration: "underline" }
};