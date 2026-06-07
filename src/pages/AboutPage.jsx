// ─────────────────────────────────────────────
//  pages/AboutPage.jsx
//  Simple info page explaining the app
//  No props needed
// ─────────────────────────────────────────────

export default function AboutPage() {
  // Info cards to show on the page
  const features = [
    {
      icon: "📋",
      title: "Track Applications",
      desc: "Store every job you apply to — company, role, location, and date.",
    },
    {
      icon: "🏷️",
      title: "Status Labels",
      desc: "Mark each job as Applied, Interview, Offer, or Rejected.",
    },
    {
      icon: "🔍",
      title: "Search & Filter",
      desc: "Quickly find jobs by name or filter by current status.",
    },
    {
      icon: "✏️",
      title: "Edit & Delete",
      desc: "Update any application or remove ones you no longer need.",
    },
  ];

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px" }}>

      {/* ── Heading ── */}
      <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: "#111827" }}>
        About JobTrackr
      </h1>
      <p style={{ margin: "0 0 32px", fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>
        JobTrackr is a simple React app to help you stay organized during your
        job search. Keep all your applications in one place and never lose track
        of where you applied.
      </p>

      {/* ── Feature cards ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 14,
        marginBottom: 36,
      }}>
        {features.map((f) => (
          <div
            key={f.title}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "18px 20px",
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 10 }}>{f.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 6 }}>
              {f.title}
            </div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>
              {f.desc}
            </div>
          </div>
        ))}
      </div>

      {/* ── Tech stack note ── */}
      <div style={{
        background: "#f0f9ff",
        border: "1px solid #bae6fd",
        borderRadius: 12,
        padding: "16px 20px",
      }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#0369a1", marginBottom: 6 }}>
          🛠️ Built with
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "#0369a1", lineHeight: 2 }}>
          <li>React (useState, props, component composition)</li>
          <li>JS data file (data/jobs.js) as the data store</li>
          <li>Components: Navbar, StatsBar, JobCard, FilterBar, Badge, Modal</li>
          <li>Pages: HomePage, AddJobPage, AboutPage</li>
        </ul>
      </div>
    </div>
  );
}
