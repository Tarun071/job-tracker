// ─────────────────────────────────────────────
//  pages/LoginPage.jsx
//
//  Calls api.js directly — no authApi.js
//  GET /users?username=xxx  → check user exists
//  Then checks password manually
// ─────────────────────────────────────────────

import { useState } from "react";
import api from "../services/api";

export default function LoginPage({ onLoginSuccess, onGoRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // GET /users?username=tarun  → json-server filters db.json
      const response = await api.get("/users", {
        params: { username: username.trim().toLowerCase() },
      });

      const users = response.data;

      if (users.length === 0) {
        setError("Username not found.");
        setLoading(false);
        return;
      }

      const user = users[0];

      if (user.password !== password) {
        setError("Incorrect password.");
        setLoading(false);
        return;
      }

      // Remove password before passing user up
      const { password: _removed, ...safeUser } = user;
      onLoginSuccess(safeUser);

    } catch (err) {
      setError("Cannot connect. Is json-server running?");
    }

    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleLogin();
  }

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    fontSize: 14, padding: "11px 13px",
    border: "1px solid #d1d5db", borderRadius: 9,
    background: "#f9fafb", color: "#111827", outline: "none",
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f1f5f9",
      display: "flex", alignItems: "center",
      justifyContent: "center", padding: 20,
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>💼</div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#0f172a" }}>JobTrackr</h1>
          {/* <p style={{ margin: "6px 0 0", fontSize: 14, color: "#64748b" }}>
            Sign in to manage your applications
          </p> */}
        </div>

        {/* Card */}
        <div style={{
          background: "#849bb9", border: "1px solid #e2e8f0",
          borderRadius: 16, padding: 28,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}>
          <h2 style={{ margin: "0 0 22px", fontSize: 17, fontWeight: 700, color: "#111827" }}>
            Login
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Username */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "black", display: "block", marginBottom: 5 }}>
                USERNAME
              </label>
              <input
                style={inputStyle} type="text" 
                value={username} onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "black", display: "block", marginBottom: 5 }}>
                PASSWORD
              </label>
              <div style={{ position: "relative" }}>
                <input
                  style={{ ...inputStyle, paddingRight: 44 }}
                  type={showPass ? "text" : "password"}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button onClick={() => setShowPass((p) => !p)} style={{
                  position: "absolute", right: 11, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", fontSize: 16, color: "black",
                }}>
                  {showPass}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: "#fef2f2", border: "1px solid #fecaca",
                borderRadius: 8, padding: "9px 13px",
                fontSize: 13, color: "#dc2626",
              }}>
                {error}
              </div>
            )}

            {/* Login button */}
            <button onClick={handleLogin} disabled={loading} style={{
              width: "100%", padding: "12px 0",
              background: loading ? "#93c5fd" : "#1d4ed8",
              color: "#fff", border: "none", borderRadius: 9,
              fontSize: 15, fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer", marginTop: 4,
            }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>

            {/* Go to Register */}
            <p style={{ textAlign: "center", fontSize: 13, color: "black", margin: 0 }}>
              Don't have an account?{" "}
              <span onClick={onGoRegister} style={{ color: "#1d4ed8", fontWeight: 600, cursor: "pointer" }}>
                Register here
              </span>
            </p>
          </div>
        </div>

        {/* Demo hint
        <div style={{
          marginTop: 16, background: "#f0f9ff", border: "1px solid #bae6fd",
          borderRadius: 10, padding: "12px 16px",
          fontSize: 12, color: "#0369a1", lineHeight: 1.8,
        }}>
          <strong>Demo:</strong> username <code>tarun</code> / password <code>tarun123</code>
        </div> */}
      </div>
    </div>
  );
}
