// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.get(
        `/users?username=${username.trim().toLowerCase()}&password=${password}`
      );

      if (response.data.length > 0) {
        const { password: _removed, ...safeUser } = response.data[0];
        localStorage.setItem("user", JSON.stringify(safeUser));
        navigate("/");
        window.location.reload();
      } else {
        setError("Invalid username or password.");
      }
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
        </div>

        <div className="auth-page__card auth-page__card--login">
          <h2 className="auth-page__card-title">Login</h2>

          <form onSubmit={handleSubmit} className="auth-page__fields">

            <div>
              <label className="auth-page__label auth-page__label--login">USERNAME</label>
              <input style={inputStyle} type="text"
                value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div>
              <label className="auth-page__label auth-page__label--login">PASSWORD</label>
              <div className="auth-page__pass-wrapper">
                <input
                  style={{ ...inputStyle, paddingRight: 44 }}
                  type={showPass ? "text" : "password"}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="auth-page__pass-toggle"
                  onClick={() => setShowPass((p) => !p)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && <div className="auth-page__error">{error}</div>}

            <button
              type="submit"
              className="auth-page__btn auth-page__btn--login"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

            <p className="auth-page__footer auth-page__footer--login">
              Don't have an account?{" "}
              <a href="/register" className="auth-page__footer-link">Register here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
