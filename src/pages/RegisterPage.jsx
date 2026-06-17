// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", username: "", email: "", password: "", confirmPassword: "",
  });
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.username.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required."); return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters."); return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match."); return;
    }
    if (!form.email.includes("@")) {
      setError("Enter a valid email."); return;
    }

    setLoading(true);
    setError("");

    try {
      // Check if username taken
      const check = await api.get(`/users?username=${form.username.trim().toLowerCase()}`);
      if (check.data.length > 0) {
        setError("Username already taken."); setLoading(false); return;
      }

      await api.post("/users", {
        name:     form.name.trim(),
        username: form.username.trim().toLowerCase(),
        email:    form.email.trim().toLowerCase(),
        password: form.password,
      });

      navigate("/login");
    } catch (err) {
      setError("Cannot connect to server.");
    }

    setLoading(false);
  }

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    fontSize: 14, padding: "11px 13px",
    border: "1px solid #d1d5db", borderRadius: 9,
    background: "#f9fafb", color: "#111827", outline: "none",
  };

  return (
    <div className="auth-page">
      <div className="auth-page__wrapper">

        <div className="auth-page__logo">
          <div className="auth-page__logo-icon">💼</div>
          <h1 className="auth-page__logo-title">JobTrackr</h1>
          <p className="auth-page__logo-sub">Create your account</p>
        </div>

        <div className="auth-page__card auth-page__card--register">
          <h2 className="auth-page__card-title">Register</h2>

          <form onSubmit={handleSubmit} className="auth-page__fields auth-page__fields--register">

            <div>
              <label className="auth-page__label auth-page__label--register">FULL NAME</label>
              <input style={inputStyle} type="text" name="name"
                value={form.name} onChange={handleChange} />
            </div>

            <div>
              <label className="auth-page__label auth-page__label--register">USERNAME</label>
              <input style={inputStyle} type="text" name="username"
                value={form.username} onChange={handleChange} />
            </div>

            <div>
              <label className="auth-page__label auth-page__label--register">EMAIL</label>
              <input style={inputStyle} type="email" name="email"
                value={form.email} onChange={handleChange} />
            </div>

            <div>
              <label className="auth-page__label auth-page__label--register">PASSWORD</label>
              <div className="auth-page__pass-wrapper">
                <input
                  style={{ ...inputStyle, paddingRight: 44 }}
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password} onChange={handleChange}
                />
                <button type="button" className="auth-page__pass-toggle"
                  onClick={() => setShowPass((p) => !p)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div>
              <label className="auth-page__label auth-page__label--register">CONFIRM PASSWORD</label>
              <input
                style={{
                  ...inputStyle,
                  borderColor: form.confirmPassword && form.confirmPassword !== form.password
                    ? "#fca5a5" : "#d1d5db"
                }}
                type="password" name="confirmPassword"
                value={form.confirmPassword} onChange={handleChange}
              />
              {form.confirmPassword && (
                <p className={`auth-page__password-match ${form.confirmPassword === form.password ? "auth-page__password-match--ok" : "auth-page__password-match--fail"}`}>
                  {form.confirmPassword === form.password ? "✓ Passwords match" : "✗ Do not match"}
                </p>
              )}
            </div>

            {error && <div className="auth-page__error">{error}</div>}

            <button type="submit" className="auth-page__btn auth-page__btn--register" disabled={loading}>
              {loading ? "Creating account..." : "Create Account ✓"}
            </button>

            <p className="auth-page__footer auth-page__footer--register">
              Already have an account?{" "}
              <a href="/login" className="auth-page__footer-link">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
