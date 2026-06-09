// ─────────────────────────────────────────────
//  components/FilterBar.jsx
//  Search input + status filter buttons
//  Props:
//    search       (string)   — current search text
//    onSearch     (function) — called on input change
//    activeFilter (string)   — current status filter
//    onFilter     (function) — called when a filter btn is clicked
// ─────────────────────────────────────────────

import { STATUS_OPTIONS } from "../data/jobs";

export default function FilterBar({ search, onSearch, activeFilter, onFilter }) {
  // All filter options: "All" + the 4 status values
  const filters = ["All", ...STATUS_OPTIONS];

  return (
    <div style={{
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      alignItems: "center",
      marginBottom: 20,
    }}>

      {/* ── Search input ── */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search company, role, location"
        style={{
          flex: 1,
          minWidth: 200,
          fontSize: 13,
          padding: "8px 12px",
          border: "1px solid #d1d5db",
          borderRadius: 8,
          background: "#f9fafb",
          color: "#111827",
          outline: "none",
        }}
      />

      {/* ── Filter buttons ── */}
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onFilter(f)}
          style={{
            fontSize: 12,
            padding: "7px 14px",
            borderRadius: 8,
            cursor: "pointer",
            border: "1px solid",
            // Active = solid blue, Inactive = outlined
            borderColor:  activeFilter === f ? "#2563eb" : "#d1d5db",
            background:   activeFilter === f ? "#2563eb" : "transparent",
            color:        activeFilter === f ? "#ffffff" : "#6b7280",
            fontWeight:   activeFilter === f ? 600 : 400,
            transition: "all 0.15s",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
