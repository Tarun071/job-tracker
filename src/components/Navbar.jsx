// ─────────────────────────────────────────────
//  components/Navbar.jsx
//  Top navigation bar with page links
//  Props:
//    currentPage  (string)   — "home" | "add" | "about"
//    onNavigate   (function) — called with page name on click
// ─────────────────────────────────────────────

export default function Navbar({ currentPage, onNavigate }) {
  // Navigation links config
  const links = [
    { id: "home",  label: "Dashboard" },
    { id: "add",   label: "Add Job"   },
    // { id: "about", label: "About"     },
  ];

  return (
    <nav style={{
      background: "#0f172a",
      padding: "0 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 56,
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      {/* ── Logo / App name ── */}
      <div
        onClick={() => onNavigate("home")}
        style={{
          color: "#f8fafc",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "-0.02em",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        💼 JobTrackr
      </div>

      {/* ── Nav links ── */}
      <div style={{ display: "flex", gap: 4 }}>
        {links.map((link) => {
          const isActive = currentPage === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              style={{
                background: isActive ? "#1e3a5f" : "transparent",
                color: isActive ? "#93c5fd" : "#94a3b8",
                border: "none",
                padding: "6px 14px",
                borderRadius: 7,
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
