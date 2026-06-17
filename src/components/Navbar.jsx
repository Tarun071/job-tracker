// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="navbar">
      <Link className="navbar__logo" to="/">JobTrackr</Link>

      <div className="navbar__links">
        <Link className="navbar__btn" to="/">Dashboard</Link>
        <Link className="navbar__btn" to="/favorites">★ Favorites</Link>

        {!user && (
          <>
            <Link className="navbar__btn" to="/register">Register</Link>
            <Link className="navbar__btn" to="/login">Login</Link>
          </>
        )}

        {user && (
          <>
            <Link className="navbar__btn" to="/add-job">+ Add Job</Link>
            <Link className="navbar__btn" to="/logout">Logout</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
