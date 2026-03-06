import React, { useState } from "react";
import { useUIStore } from "@/store/ui.store";
import useLogin from "@/services/apis/useLogin";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Access the store to navigate away after login
  const setActiveTab = useUIStore((s) => s.setActiveTab);
  const {login}  = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate an API call
    // setTimeout(() => {
    //   setLoading(false);
    //   setActiveTab("dashboard"); 
    // }, 1500);
    login(
      (data) => {
        setLoading(false);
        // This changes the Zustand state, triggering App.tsx to show <ValidateOtp />
        setActiveTab("validate"); 
      },
      (err) => {
        setLoading(false);
        setError("Connection failed. Please check CORS or Network.");
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <header style={styles.header}>
          <h2 style={styles.title}>System Login</h2>
          {/* <p style={styles.subtitle}>Enter credentials to access terminal</p> */}
        </header>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username / Email</label>
            <input
              type="email"
              name="email"
              // required
              style={styles.input}
              placeholder="Username hardcoded"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              // required
              style={styles.input}
              placeholder="••••••••"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              ...styles.button, 
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer" 
            }}
          >
            {loading ? "AUTHENTICATING..." : "INITIALIZE SESSION"}
          </button>
        </form>

        {/* <div style={styles.footer}>
          <span>Secured Connection: AES-256</span>
          <span style={styles.dot}>•</span>
          <span>v1.0.4</span>
        </div> */}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg-void)",
  },
  loginCard: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    background: "var(--bg-panel)",
    border: "1px solid var(--border)",
    borderRadius: "4px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  header: {
    marginBottom: "30px",
    textAlign: "center",
  },
  title: {
    fontSize: "20px",
    color: "#fff",
    margin: "0 0 8px 0",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: "12px",
    color: "var(--text-muted)",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "11px",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    padding: "12px",
    background: "var(--bg-void)",
    border: "1px solid var(--border)",
    color: "#fff",
    borderRadius: "4px",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    marginTop: "10px",
    padding: "14px",
    background: "#2ebd59", // Trading green
    color: "#000",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "12px",
    letterSpacing: "1px",
    transition: "all 0.2s ease",
  },
  footer: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    fontSize: "10px",
    color: "var(--text-muted)",
    fontFamily: "var(--font-mono)",
  },
  dot: {
    color: "#444",
  }
};