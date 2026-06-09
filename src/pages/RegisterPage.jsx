// ─────────────────────────────────────────────
//  pages/RegisterPage.jsx
//
//  Calls api.js directly — no authApi.js
//  GET /users?username=xxx  → check if taken
//  GET /users?email=xxx     → check if taken
//  POST /users              → add to db.json
// ─────────────────────────────────────────────

import { useState } from "react";
import api from "../services/api";

export default function RegisterPage({ onRegisterSuccess, onGoLogin }) {
  const [form, setForm] = useState({
    name: "", username: "", email: "", password: "", confirmPassword: "",
  });
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleRegister() {
    // Validation
    if (!form.name.trim() || !form.username.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Check if username already taken
      const usernameCheck = await api.get("/users", {
        params: { username: form.username.trim().toLowerCase() },
      });
      if (usernameCheck.data.length > 0) {
        setError("Username already taken. Choose another.");
        setLoading(false);
        return;
      }

      // Check if email already registered
      const emailCheck = await api.get("/users", {
        params: { email: form.email.trim().toLowerCase() },
      });
      if (emailCheck.data.length > 0) {
        setError("Email already registered.");
        setLoading(false);
        return;
      }

      // POST /users → json-server writes new user into db.json
      const response = await api.post("/users", {
        name:     form.name.trim(),
        username: form.username.trim().toLowerCase(),
        email:    form.email.trim().toLowerCase(),
        password: form.password,
      });

      // Auto-login — remove password before passing up
      const { password: _removed, ...safeUser } = response.data;
      onRegisterSuccess(safeUser);

    } catch (err) {
      setError("Cannot connect. Is json-server running?");
    }

    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleRegister();
  }

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    fontSize: 14, padding: "11px 13px",
    border: "1px solid #d1d5db", borderRadius: 9,
    background: "#f9fafb", color: "#111827", outline: "none",
  };

  const labelStyle = {
    fontSize: 12, fontWeight: 600, color: "#6b7280",
    display: "block", marginBottom: 5,
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
          <p style={{ margin: "6px 0 0", fontSize: 14, color: "#64748b" }}>
            Create your account
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#fff", border: "1px solid #e2e8f0",
          borderRadius: 16, padding: 28,
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}>
          <h2 style={{ margin: "0 0 22px", fontSize: 17, fontWeight: 700, color: "#111827" }}>
            Register
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>

            {/* Full Name */}
            <div>
              <label style={labelStyle}>FULL NAME</label>
              <input
                style={inputStyle} type="text" 
                value={form.name} onChange={(e) => handleChange("name", e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Username */}
            <div>
              <label style={labelStyle}>USERNAME</label>
              <input
                style={inputStyle} type="text" 
                value={form.username} onChange={(e) => handleChange("username", e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>EMAIL</label>
              <input
                style={inputStyle} type="email" 
                value={form.email} onChange={(e) => handleChange("email", e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>PASSWORD</label>
              <div style={{ position: "relative" }}>
                <input
                  style={{ ...inputStyle, paddingRight: 44 }}
                  type={showPass ? "text" : "password"}
                  value={form.password} onChange={(e) => handleChange("password", e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button onClick={() => setShowPass((p) => !p)} style={{
                  position: "absolute", right: 11, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", fontSize: 16, color: "#9ca3af",
                }}>
                  {/* {showPass ? "🙈" : "👁️"} */}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={labelStyle}>CONFIRM PASSWORD</label>
              <input
                style={{
                  ...inputStyle,
                  borderColor: form.confirmPassword && form.confirmPassword !== form.password
                    ? "#fca5a5" : "#d1d5db",
                }}
                type="password" 
                value={form.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {form.confirmPassword && (
                <p style={{
                  margin: "4px 0 0", fontSize: 11,
                  color: form.confirmPassword === form.password ? "#16a34a" : "#dc2626",
                }}>
                  {form.confirmPassword === form.password ? "✓ Passwords match" : "✗ Do not match"}
                </p>
              )}
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

            {/* Register button */}
            <button onClick={handleRegister} disabled={loading} style={{
              width: "100%", padding: "12px 0",
              background: loading ? "#86efac" : "#16a34a",
              color: "#fff", border: "none", borderRadius: 9,
              fontSize: 15, fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer", marginTop: 4,
            }}>
              {loading ? "Creating account..." : "Create Account ✓"}
            </button>

            {/* Go to Login */}
            <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280", margin: 0 }}>
              Already have an account?{" "}
              <span onClick={onGoLogin} style={{ color: "#1d4ed8", fontWeight: 600, cursor: "pointer" }}>
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
